import type { Note } from "../types";
import { NoteCard } from "./NoteCard";

type NoteListProps = {
  notes: Note[];
  onPin: (id: string) => void;
  onArchive: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function NoteList({
  notes,
  onPin,
  onArchive,
  onEdit,
  onDelete,
}: NoteListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onPin={onPin}
          onArchive={onArchive}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}