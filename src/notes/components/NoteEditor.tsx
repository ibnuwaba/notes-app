import { useId, useState } from "react";
import type { Note } from "../types";

type NoteEditorProps = {
  note?: Note;
  onSave: (title: string, body: string) => void;
  onCancel: () => void;
};

export function NoteEditor({
  note,
  onSave,
  onCancel,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [body, setBody] = useState(note?.body ?? "");

  const titleId = useId();
  const bodyId = useId();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle) {
      return;
    }

    onSave(trimmedTitle, trimmedBody);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          {note ? "Edit note" : "Create a note"}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {note
            ? "Update your note and save your changes."
            : "Capture an idea, task, or thought."}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor={titleId}
            className="mb-1.5 block text-sm font-medium"
          >
            Title
          </label>

          <input
            id={titleId}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Give your note a title..."
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-2.5 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 dark:border-gray-700 dark:focus:border-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor={bodyId}
            className="mb-1.5 block text-sm font-medium"
          >
            Body
          </label>

          <textarea
            id={bodyId}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write your note..."
            rows={6}
            className="w-full resize-y rounded-xl border border-gray-300 bg-transparent px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 dark:border-gray-700 dark:focus:border-gray-400"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        {note && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          {note ? "Save changes" : "Add note"}
        </button>
      </div>
    </form>
  );
}