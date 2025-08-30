import { useState } from "react";

function OptionsMenu({ onEdit, onDelete, onAddChild, type }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-white/60 hover:text-white rounded transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-32 bg-white/10 backdrop-blur-xl rounded-lg shadow-2xl border border-white/30 z-20">
            <div className="py-1">
              {type === "section" && (
                <button
                  onClick={() => {
                    onAddChild("checklist");
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded transition-colors"
                >
                  Add Checklist
                </button>
              )}
              {type === "checklist" && (
                <button
                  onClick={() => {
                    onAddChild("subchecklist");
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded transition-colors"
                >
                  Add Sub-item
                </button>
              )}
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white/90 hover:bg-white/10 rounded transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OptionsMenu;
