const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const popupTitle = popupBox.querySelector('header p');
const closeIcon = popupBox.querySelector('header i');
const titleNote = popupBox.querySelector('input');
const description = popupBox.querySelector('textarea');
const addBtn = popupBox.querySelector('button');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//getting localstorage  notes if exist and parsing them to js object else paasing an empty array to notes
const notes = JSON.parse(localStorage.getItem('notes') || "[]");
let isUpdate = false, updateId;

addBox.addEventListener('click', () => {
    titleNote.focus();
    //add the show class in the popup
    popupBox.classList.add('show');

});

closeIcon.addEventListener('click', () => {
    isUpdate = false;
    //Make the inputs blank when user close the popup
    titleNote.value = '';
    description.value = '';
    addBtn.innerText = 'Add a new Note';
    popupTitle.innerText = 'Add a new Note';
    //remove the show class in popup
    popupBox.classList.remove('show');
});

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        //create a li tag the includes the not title, description.dete

        let liTag = ` <li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.description}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <i onclick = "showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                    <ul class="menu">
                                        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-solid fa-pen"></i> Edit</li>
                                        <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i> Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </li>`;
        //add the litag into box item.
        addBox.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();
//Functuion that showing the menu shen clicking the seetings
function showMenu(elem) {
    elem.parentElement.classList.add('show');
    //removing the show class from settings on document click
    document.addEventListener('click', e => {
        if (e.target.tagName != 'I' || e.target != elem) {
            elem.parentElement.classList.remove('show');
        }

    });
}

//Function deleting the note
function deleteNote(noteId) {
    let confirmDel = confirm('Are you sure you want to delete this note? ');
    if (!confirmDel) return;
    notes.splice(noteId, 1); //removing selected note from array
    //saving updated notes to localstorage
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}
function updateNote(noteID, title, desc) {
    updateId = noteID;
    isUpdate = true;
    addBox.click();
    titleNote.value = title;
    description.value = desc;
    addBtn.innerText = 'Update Note';
    popupTitle.innerText = 'Update Note';
    console.log(title, description);
}

addBtn.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titleNote.value,
        noteDesc = description.value;

    if (noteTitle || noteDesc) {
        //getting the mounth,day,year the current date
        let dateObj = new Date(),
            day = dateObj.getDate(),
            month = months[dateObj.getMonth()],
            year = dateObj.getFullYear();

        //Create Object with note information
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${day} ${month} ${year}`
        }

        if (isUpdate) {
            notes.push(noteInfo); // add new nots into notes array
            //saving notes to LocalStorage

        } else {
            isUpdate = false;
            notes[updateId] = noteInfo // updating specified note
        }
        notes.push(noteInfo); // add new nots into notes array
        //saving notes to LocalStorage
        localStorage.setItem('notes', JSON.stringify(notes)); //Convert the object to string

        closeIcon.click();
        showNotes();

    }


});