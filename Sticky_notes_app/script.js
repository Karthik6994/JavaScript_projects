const addNoteBtn = document.getElementById("add-note");
const noteText = document.getElementById("note-text");
const notesContainer = document.getElementById("notes-container");

let notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];

function saveNotes() {
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function displayNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.innerHTML = `
      <button class="delete" onclick="deleteNote(${index})">X</button>
      <p>${note}</p>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

function addNote() {
  const text = noteText.value.trim();
  if (text === "") return;
  notes.push(text);
  noteText.value = "";
  saveNotes();
  displayNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  displayNotes();
}

addNoteBtn.addEventListener("click", addNote);

displayNotes();
