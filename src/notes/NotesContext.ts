import { createContext } from "react";
import type { NotesContextValue } from "./NotesContextValue";

export const NotesContext = createContext<NotesContextValue | undefined>(
  undefined,
);