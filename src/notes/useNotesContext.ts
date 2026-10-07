import { useContext } from "react";
import { NotesContext } from "./NotesContext";

export function useNotesContext() {
  const context = useContext(NotesContext);

  if (context === undefined) {
    throw new Error("useNotesContext must be used within NotesProvider");
  }

  return context;
}