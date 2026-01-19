import React from "react";
import { AlertOctagon, Trash2 } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-indigo-900/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[var(--bg-modal)] border-2 border-red-100 rounded-[24px] shadow-[8px_8px_0px_0px_var(--shadow-color)] w-full max-w-sm p-6 z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 text-red-600 mb-6">
          <div className="p-3 bg-red-50 rounded-xl border-2 border-red-100">
            <AlertOctagon className="w-8 h-8 stroke-[2px]" />
          </div>

          <h3 className="text-2xl font-black text-[var(--text-main)]">
            Delete Note?
          </h3>
        </div>
        <p className="text-[var(--text-muted)] font-medium text-lg mb-8 leading-relaxed">
          Are you sure? This action{" "}
          <span className="font-bold text-[var(--text-main)]">
            cannot be undone
          </span>
          .
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-3 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] rounded-xl transition-all"
          >
            Nah, keep it
          </button>
          <button
            onClick={onConfirm}
            className="
              bg-red-600 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2
              border-2 border-red-700
              shadow-[4px_4px_0px_0px_var(--shadow-color)]
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]
              active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
              transition-all
            "
          >
            <Trash2 className="w-5 h-5" />
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
