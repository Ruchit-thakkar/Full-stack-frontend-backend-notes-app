import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import NoteCard from "./components/NoteCard";
import NoteEditor from "./components/NoteEditor";
import DeleteModal from "./components/DeleteModal";
import EmptyState from "./components/EmptyState";

const BASE_URL = "http://localhost:8000/api";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // --- THEME LOGIC ---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // --- API ---
  const getAllNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      if (response.data && response.data.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleSaveNote = async (formData) => {
    try {
      if (noteToEdit) {
        const response = await axios.put(
          `${BASE_URL}/notes/${noteToEdit._id}`,
          formData,
        );
        if (response.data && response.data.note) {
          setNotes((prev) =>
            prev.map((n) =>
              n._id === noteToEdit._id ? response.data.note : n,
            ),
          );
          setIsEditorOpen(false);
        }
      } else {
        const response = await axios.post(`${BASE_URL}/notes`, formData);
        if (response.data && response.data.note) {
          setNotes((prev) => [response.data.note, ...prev]);
          setIsEditorOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;
    try {
      await axios.delete(`${BASE_URL}/notes/${noteToDelete}`);
      setNotes((prev) => prev.filter((n) => n._id !== noteToDelete));
      setNoteToDelete(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleTogglePin = async (note) => {
    try {
      setNotes((prev) =>
        prev.map((n) =>
          n._id === note._id ? { ...n, isPinned: !n.isPinned } : n,
        ),
      );
      await axios.put(`${BASE_URL}/notes/update-pin/${note._id}`, {
        isPinned: !note.isPinned,
      });
    } catch (error) {
      getAllNotes();
    }
  };

  const filteredNotes = useMemo(() => {
    if (!searchQuery) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [notes, searchQuery]);

  const pinnedNotes = filteredNotes.filter((n) => n.isPinned);
  const otherNotes = filteredNotes.filter((n) => !n.isPinned);

  const openEditor = (note = null) => {
    setNoteToEdit(note);
    setIsEditorOpen(true);
  };

  return (
    // Background is handled by body styles in index.css now
    <div className="min-h-screen font-sans selection:bg-indigo-200 selection:text-indigo-900">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenEditor={() => openEditor(null)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        {filteredNotes.length === 0 && (
          <EmptyState onOpenEditor={() => openEditor(null)} />
        )}

        {/* Pinned Section */}
        {pinnedNotes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-black text-[var(--text-main)] flex items-center gap-2 mb-6">
              <span className="text-orange-500">📌</span> Pinned Ideas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pinnedNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => openEditor(note)}
                  onDelete={() => setNoteToDelete(note._id)}
                  onPin={() => handleTogglePin(note)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Section */}
        {otherNotes.length > 0 && (
          <div>
            {pinnedNotes.length > 0 && (
              <h2 className="text-lg font-black text-[var(--text-muted)] mb-6 flex items-center gap-2">
                <span>📝</span> Everything Else
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => openEditor(note)}
                  onDelete={() => setNoteToDelete(note._id)}
                  onPin={() => handleTogglePin(note)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <NoteEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveNote}
        note={noteToEdit}
      />

      <DeleteModal
        isOpen={!!noteToDelete}
        onClose={() => setNoteToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default App;
