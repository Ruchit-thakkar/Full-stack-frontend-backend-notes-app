import React, { useState, useEffect } from "react";
import { Pin, X, Save } from "lucide-react";

const NoteEditor = ({ isOpen, onClose, onSave, note = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    isPinned: false,
  });

  useEffect(() => {
    if (isOpen && note) {
      setFormData({
        title: note.title,
        content: note.content,
        isPinned: note.isPinned,
      });
    } else {
      setFormData({ title: "", content: "", isPinned: false });
    }
  }, [isOpen, note]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-indigo-900/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-[24px] shadow-[8px_8px_0px_0px_var(--shadow-color)] w-full max-w-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b-2 border-[var(--border-color)] bg-[var(--bg-main)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setFormData({ ...formData, isPinned: !formData.isPinned })
              }
              className={`p-2.5 rounded-xl border-2 transition-all ${
                formData.isPinned
                  ? "bg-orange-50 border-orange-200 text-orange-500 shadow-[2px_2px_0px_0px_#fdba74]"
                  : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-indigo-300 hover:text-indigo-500"
              }`}
            >
              <Pin
                className={`w-5 h-5 ${formData.isPinned ? "fill-current" : ""}`}
              />
            </button>
            <h2 className="text-lg font-black text-[var(--text-main)]">
              {note ? "Edit Idea" : "New Idea"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] rounded-xl transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Inputs */}
        <div className="p-6 space-y-4 bg-[var(--bg-card)]">
          <input
            className="text-3xl font-black w-full outline-none placeholder:text-[var(--text-muted)] bg-transparent text-[var(--text-main)]"
            placeholder="Give it a title..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            autoFocus
          />

          <textarea
            className="w-full h-64 outline-none resize-none text-lg font-medium text-[var(--text-main)] placeholder:text-[var(--text-muted)] bg-transparent leading-relaxed py-4"
            placeholder="What's on your mind?"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </div>

        {/* Footer */}
        <div className="bg-[var(--bg-main)] px-6 py-4 flex justify-end gap-3 border-t-2 border-[var(--border-color)]">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)] rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(formData);
              onClose();
            }}
            className="
              bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2
              border-2 border-indigo-700
              shadow-[4px_4px_0px_0px_var(--shadow-color)]
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]
              active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
              transition-all
            "
          >
            <Save className="w-5 h-5" />
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
