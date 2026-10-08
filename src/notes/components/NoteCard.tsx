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
    <article className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex-1">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="line-clamp-2 font-semibold tracking-tight">
            {note.title}
          </h2>

          {note.pinned && (
            <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium dark:bg-gray-800">
              Pinned
            </span>
          )}
        </div>

        <p className="min-h-12 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {excerpt || "No content"}
        </p>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          Updated {updatedDate}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
        <button
          type="button"
          onClick={() => onPin(note.id)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>

        <button
          type="button"
          onClick={() => onArchive(note.id)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(note.id)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Edit
        </button>

        {!confirmDelete ? (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Delete
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onDelete(note.id)}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </article>
  );
}