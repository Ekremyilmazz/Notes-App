import { Note } from "../models/Note";

export function getNotesFromStorage(): Note[] {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
}

export function saveNotesToStorage(notes: Note[]): void {
  localStorage.setItem("notes", JSON.stringify(notes));
}
