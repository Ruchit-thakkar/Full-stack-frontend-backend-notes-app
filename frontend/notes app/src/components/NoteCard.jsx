import React from "react";
import { Pin, Trash2 } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
  return (
    <div
      onClick={onEdit}
      className={`
        group relative p-6 rounded-[20px] cursor-pointer transition-all duration-200
        bg-[var(--bg-card)] border-2 
        ${
          note.isPinned
            ? "border-orange-400 shadow-[6px_6px_0px_0px_#fb923c]"
            : "border-[var(--border-color)] shadow-[6px_6px_0px_0px_var(--shadow-color)]"
        }
        hover:-translate-y-2 hover:border-indigo-500 
        hover:shadow-[8px_8px_0px_0px_#6366f1]
        flex flex-col h-auto min-h-[200px]
      `}
    >
      <div className="flex justify-between items-start mb-4 gap-3">
        <h3 className="font-extrabold text-xl text-[var(--text-main)] line-clamp-2 leading-tight">
          {note.title || (
            <span className="text-[var(--text-muted)] italic font-medium">
              Untitled Idea
            </span>
          )}
        </h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPin(note);
          }}
          className={`p-2.5 rounded-xl transition-all duration-200 border-2 ${
            note.isPinned
              ? "bg-orange-50 border-orange-200 text-orange-500 shadow-[2px_2px_0px_0px_#fdba74]"
              : "bg-[var(--bg-main)] border-[var(--border-color)] text-[var(--text-muted)] md:opacity-0 md:group-hover:opacity-100 hover:bg-[var(--bg-card)] hover:border-indigo-200 hover:text-indigo-500 hover:shadow-[2px_2px_0px_0px_#a5b4fc]"
          }`}
        >
          <Pin
            className={`w-5 h-5 ${note.isPinned ? "fill-current stroke-[2px]" : "stroke-[2px]"}`}
          />
        </button>
      </div>

      <p className="text-[var(--text-muted)] text-[15px] leading-relaxed line-clamp-5 flex-grow font-medium">
        {note.content}
      </p>

      <div className="flex justify-between items-center mt-6 pt-4 border-t-2 border-[var(--border-color)] group-hover:border-indigo-100 transition-colors">
        <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
          {note.createdAt
            ? new Date(note.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })
            : "Today"}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="
            p-2 rounded-lg transition-colors 
            text-[var(--text-muted)] hover:text-red-600 bg-transparent hover:bg-red-50 
            opacity-100 md:opacity-0 md:group-hover:opacity-100
          "
        >
          <Trash2 className="w-5 h-5 stroke-[2px]" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
