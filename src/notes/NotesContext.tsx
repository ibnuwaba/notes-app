import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Note, View } from "./types";
import type { NotePatch } from "./NotesContextValue";
import { NotesContext } from "./NotesContext";

type NotesAction =
  | { type: "add"; payload: { title: string; body: string } }
  | { type: "update"; payload: { id: string; patch: NotePatch } }
  | { type: "remove"; payload: { id: string } }
  | { type: "togglePin"; payload: { id: string } }
  | { type: "toggleArchive"; payload: { id: string } };

function notesReducer(notes: Note[], action: NotesAction): Note[] {
  switch (action.type) {
    case "add": {
      const now = new Date().toISOString();

      return [
        {
          id: crypto.randomUUID(),
          title: action.payload.title,
          body: action.payload.body,
          createdAt: now,
          updatedAt: now,
          pinned: false,
          archived: false,
        },
        ...notes,
      ];
    }

    case "update":
      return notes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              ...action.payload.patch,
              updatedAt: new Date().toISOString(),
            }
          : note,
      );

    case "remove":
      return notes.filter((note) => note.id !== action.payload.id);

    case "togglePin":
      return notes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              pinned: !note.pinned,
              updatedAt: new Date().toISOString(),
            }
          : note,
      );

    case "toggleArchive":
      return notes.map((note) =>
        note.id === action.payload.id
          ? {
              ...note,
              archived: !note.archived,
              updatedAt: new Date().toISOString(),
            }
          : note,
      );
  }
}

export function NotesProvider({ children }: { children: ReactNode }) {
  const [storedNotes, setStoredNotes] = useLocalStorage<Note[]>(
    "notes",
    [],
  );

  const [notes, dispatch] = useReducer(notesReducer, storedNotes);

  const addNote = useCallback((title: string, body: string) => {
    dispatch({
      type: "add",
      payload: { title, body },
    });
  }, []);

  const updateNote = useCallback(
    (id: string, patch: NotePatch) => {
      dispatch({
        type: "update",
        payload: { id, patch },
      });
    },
    [],
  );

  const removeNote = useCallback((id: string) => {
    dispatch({
      type: "remove",
      payload: { id },
    });
  }, []);

  const togglePin = useCallback((id: string) => {
    dispatch({
      type: "togglePin",
      payload: { id },
    });
  }, []);

  const toggleArchive = useCallback((id: string) => {
    dispatch({
      type: "toggleArchive",
      payload: { id },
    });
  }, []);

  const notesFor = useCallback(
    (view: View) => {
      const filtered = notes.filter((note) => {
        if (view === "pinned") {
          return note.pinned && !note.archived;
        }

        if (view === "archived") {
          return note.archived;
        }

        return !note.archived;
      });

      return [...filtered].sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt),
      );
    },
    [notes],
  );

  const value = useMemo(
    () => ({
      notes,
      addNote,
      updateNote,
      removeNote,
      togglePin,
      toggleArchive,
      notesFor,
    }),
    [
      notes,
      addNote,
      updateNote,
      removeNote,
      togglePin,
      toggleArchive,
      notesFor,
    ],
  );

  useEffect(() => {
    setStoredNotes(notes);
  }, [notes, setStoredNotes]);

  return (
    <NotesContext value={value}>
      {children}
    </NotesContext>
  );
}