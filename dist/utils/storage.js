"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesFromStorage = getNotesFromStorage;
exports.saveNotesToStorage = saveNotesToStorage;
function getNotesFromStorage() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}
function saveNotesToStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}
