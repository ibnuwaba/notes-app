import { useState } from "react";
import type { Note } from "../types";

type NoteCardProps = {
  note: Note;
  onPin: (id: string) => void;
  onArchive: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function NoteCard({
  note,
  onPin,
  onArchive,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const excerpt =
    note.body.length > 120
      ? `${note.body.slice(0, 120)}...`
      : note.body;

  const updatedDate = new Date(note.updatedAt).toLocaleDateString();

  return (
    <article className="rounded-xl border p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{note.title}</h2>
          <p className="mt-1 text-sm opacity-70">{excerpt}</p>
        </div>

        {note.pinned && (
          <span className="text-sm" aria-label="Pinned">
            Pinned
          </span>
        )}
      </div>

      <p className="mb-4 text-xs opacity-60">
        Updated {updatedDate}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onPin(note.id)}
          className="rounded-lg border px-3 py-1.5 text-sm"
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>

        <button
          type="button"
          onClick={() => onArchive(note.id)}
          className="rounded-lg border px-3 py-1.5 text-sm"
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(note.id)}
          className="rounded-lg border px-3 py-1.5 text-sm"
        >
          Edit
        </button>

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="rounded-lg border px-3 py-1.5 text-sm"
          >
            Delete
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onDelete(note.id)}
              className="rounded-lg border px-3 py-1.5 text-sm"
            >
              Confirm delete
            </button>

            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded-lg border px-3 py-1.5 text-sm"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </article>
  );
}