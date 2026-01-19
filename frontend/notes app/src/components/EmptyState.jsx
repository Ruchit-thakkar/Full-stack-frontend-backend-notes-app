import React from "react";
import { Sparkles, Plus } from "lucide-react";

// Added onOpenEditor prop for quick action
const EmptyState = ({ onOpenEditor }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 p-8 text-center">
      <div className="bg-indigo-100 p-6 rounded-[24px] mb-6 shadow-[4px_4px_0px_0px_#c7d2fe] border-2 border-indigo-200 rotate-3 transition-transform hover:rotate-6">
        <Sparkles className="w-12 h-12 text-indigo-600 fill-current" />
      </div>
      <h2 className="text-3xl font-black text-gray-900 mb-3">
        It's quiet here...
      </h2>
      <p className="text-lg text-gray-500 font-medium max-w-md mb-8">
        Capture your first brilliant idea before it floats away!
      </p>
      <button
        onClick={onOpenEditor}
        className="
          bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2
          border-2 border-indigo-700
          shadow-[4px_4px_0px_0px_#3730a3]
          hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#3730a3]
          transition-all
        "
      >
        <Plus className="w-6 h-6 stroke-[3px]" />
        Create First Note
      </button>
    </div>
  );
};

export default EmptyState;
