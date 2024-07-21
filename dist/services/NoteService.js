"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const storage_1 = require("../utils/storage");
class NoteService {
    constructor() {
        this.notes = [];
        this.notes = (0, storage_1.getNotesFromStorage)();
    }
    getNotes() {
        return this.notes;
    }
    addNote(title, content) {
        const newNote = {
            id: new Date().getTime(),
            title,
            content,
            createdAt: new Date()
        };
        this.notes.push(newNote);
        (0, storage_1.saveNotesToStorage)(this.notes);
        return newNote;
    }
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        (0, storage_1.saveNotesToStorage)(this.notes);
    }
    updateNote(id, title, content) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.title = title;
            note.content = content;
            (0, storage_1.saveNotesToStorage)(this.notes);
        }
    }
}
exports.NoteService = NoteService;
