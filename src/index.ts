import { NoteService } from "./services/NoteService";

const noteService = new NoteService();

// HTML elementlerini seçme
const noteForm = document.getElementById("noteForm") as HTMLFormElement;
const noteTitle = document.getElementById("noteTitle") as HTMLInputElement;
const noteContent = document.getElementById("noteContent") as HTMLTextAreaElement;
const notesList = document.getElementById("notesList") as HTMLUListElement;

const editModal = document.getElementById("editModal") as HTMLDivElement;
const closeModal = document.getElementById("closeModal") as HTMLSpanElement;
const editForm = document.getElementById("editForm") as HTMLFormElement;
const editTitle = document.getElementById("editTitle") as HTMLInputElement;
const editContent = document.getElementById("editContent") as HTMLTextAreaElement;

let currentEditId: number | null = null;

// Notları gösterme
function displayNotes(): void {
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
(window as any).editNote = (id: number) => {
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
(window as any).deleteNote = (id: number) => {
  noteService.deleteNote(id);
  displayNotes();
};

// Uygulamayı başlatma
displayNotes();
