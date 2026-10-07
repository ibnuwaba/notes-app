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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={titleId} className="mb-1 block text-sm font-medium">
          Title
        </label>

        <input
          id={titleId}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Note title"
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor={bodyId} className="mb-1 block text-sm font-medium">
          Body
        </label>

        <textarea
          id={bodyId}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write your note..."
          rows={6}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg border px-4 py-2"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}