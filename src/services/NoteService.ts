import { Note } from "../models/Note";
import { getNotesFromStorage, saveNotesToStorage } from "../utils/storage";

export class NoteService {
  private notes: Note[] = [];

  constructor() {
    this.notes = getNotesFromStorage();
  }

  public getNotes(): Note[] {
    return this.notes;
  }

  public addNote(title: string, content: string): Note {
    const newNote: Note = {
      id: new Date().getTime(),
      title,
      content,
      createdAt: new Date()
    };
    this.notes.push(newNote);
    saveNotesToStorage(this.notes);
    return newNote;
  }

  public deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
    saveNotesToStorage(this.notes);
  }

  public updateNote(id: number, title: string, content: string): void {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      note.title = title;
      note.content = content;
      saveNotesToStorage(this.notes);
    }
  }
}
