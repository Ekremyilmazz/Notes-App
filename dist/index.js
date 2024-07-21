"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NoteService_1 = require("./services/NoteService");
const noteService = new NoteService_1.NoteService();
// HTML elementlerini seçme
const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const notesList = document.getElementById("notesList");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const editForm = document.getElementById("editForm");
const editTitle = document.getElementById("editTitle");
const editContent = document.getElementById("editContent");
let currentEditId = null;
// Notları gösterme
function displayNotes() {
    notesList.innerHTML = "";
    const notes = noteService.getNotes();
    notes.forEach(note => {
        const noteItem = document.createElement("li");
        noteItem.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="editNote(${note.id})">Düzenle</button>
      <button onclick="deleteNote(${note.id})">Sil</button>
    `;
        notesList.appendChild(noteItem);
    });
}
// Not ekleme
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = noteTitle.value;
    const content = noteContent.value;
    if (title && content) {
        noteService.addNote(title, content);
        displayNotes();
        noteForm.reset();
    }
});
// Not düzenleme
window.editNote = (id) => {
    const note = noteService.getNotes().find(note => note.id === id);
    if (note) {
        currentEditId = id;
        editTitle.value = note.title;
        editContent.value = note.content;
        editModal.style.display = "block";
    }
};
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentEditId !== null) {
        noteService.updateNote(currentEditId, editTitle.value, editContent.value);
        displayNotes();
        editModal.style.display = "none";
    }
});
closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
});
// Not silme
window.deleteNote = (id) => {
    noteService.deleteNote(id);
    displayNotes();
};
// Uygulamayı başlatma
displayNotes();
