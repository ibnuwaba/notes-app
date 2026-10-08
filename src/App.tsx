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
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
  <header className="border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Notes
        </h1>
        <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
          Capture your ideas and keep them organized.
        </p>
      </div>

      <ThemeToggle />
    </div>
  </header>
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6 sm:py-8">
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
          <div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">
      {view === "all" && "Your notes"}
      {view === "pinned" && "Pinned notes"}
      {view === "archived" && "Archived notes"}
    </h2>

    <span className="text-sm text-gray-500 dark:text-gray-400">
      {visibleNotes.length}{" "}
      {visibleNotes.length === 1 ? "note" : "notes"}
    </span>
  </div>

  <NoteList
    notes={visibleNotes}
    onPin={togglePin}
    onArchive={toggleArchive}
    onEdit={setEditingId}
    onDelete={removeNote}
  />
</div>
        )}
      </main>
    </div>
  );
}

export default App;