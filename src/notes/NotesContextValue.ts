import type { Note, View } from "./types";

export type NotePatch = Partial<Pick<Note, "title" | "body">>;

export type NotesContextValue = {
  notes: Note[];
  addNote: (title: string, body: string) => void;
  updateNote: (id: string, patch: NotePatch) => void;
  removeNote: (id: string) => void;
  togglePin: (id: string) => void;
  toggleArchive: (id: string) => void;
  notesFor: (view: View) => Note[];
};