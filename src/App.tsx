import { useState } from "react";
import { ThemeToggle } from "./theme/ThemeToggle";
import { useNotes } from "./notes/useNotes";
import type { View } from "./notes/types";
import { NoteEditor } from "./notes/components/NoteEditor";
import { NoteList } from "./notes/components/NoteList";
import { ViewTabs } from "./notes/components/ViewTabs";

function App() {
  const {
    notes,
    notesFor,
    addNote,
    updateNote,
    removeNote,
    togglePin,
    toggleArchive,
  } = useNotes();

  const [view, setView] = useState<View>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const visibleNotes = notesFor(view);
  const editingNote = notes.find((note) => note.id === editingId);

  const handleSave = (title: string, body: string) => {
    if (editingNote) {
      updateNote(editingNote.id, { title, body });
      setEditingId(null);
      return;
    }

    addNote(title, body);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <ViewTabs
          view={view}
          onViewChange={setView}
          counts={{
            all: notesFor("all").length,
            pinned: notesFor("pinned").length,
            archived: notesFor("archived").length,
          }}
        />

        <NoteEditor
          key={editingId ?? "new"}
          note={editingNote}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />

        {visibleNotes.length === 0 ? (
          <div className="rounded-xl border p-8 text-center">
            <h2 className="text-lg font-semibold">
              {view === "all" && "No notes yet"}
              {view === "pinned" && "No pinned notes"}
              {view === "archived" && "No archived notes"}
            </h2>

            <p className="mt-2 text-sm opacity-70">
              {view === "all" && "Create your first note to get started."}
              {view === "pinned" && "Pin a note and it will appear here."}
              {view === "archived" && "Archived notes will appear here."}
            </p>
          </div>
        ) : (
          <NoteList
            notes={visibleNotes}
            onPin={togglePin}
            onArchive={toggleArchive}
            onEdit={setEditingId}
            onDelete={removeNote}
          />
        )}
      </main>
    </div>
  );
}

export default App;