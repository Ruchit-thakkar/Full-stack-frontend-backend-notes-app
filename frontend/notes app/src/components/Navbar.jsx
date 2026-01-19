import React from "react";
import { Search, Plus, Moon, Sun } from "lucide-react";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  onOpenEditor,
  theme,
  toggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-main)]/90 backdrop-blur-md border-b-2 border-[var(--border-color)] px-6 py-5 flex items-center justify-between transition-colors duration-300">
      <h1 className="text-3xl font-black tracking-tighter text-[var(--text-main)] flex items-center">
        Note<span className="text-orange-500">ly</span>.
      </h1>

      <div className="relative w-full max-w-md mx-8 hidden md:block group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
        <input
          type="text"
          placeholder="Quick search..."
          className="w-full bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-2xl py-3 pl-12 pr-4 font-medium text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-indigo-500 transition-all"
        >
          {theme === "light" ? (
            <Moon className="w-6 h-6" />
          ) : (
            <Sun className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={onOpenEditor}
          className="
            bg-indigo-600 text-white font-bold px-5 py-3 rounded-2xl flex items-center gap-2
            border-2 border-indigo-700
            shadow-[4px_4px_0px_0px_var(--shadow-color)]
            hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--shadow-color)]
            active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
            transition-all
          "
        >
          <Plus className="w-6 h-6 stroke-[3px]" />
          <span className="hidden sm:inline">Create</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
