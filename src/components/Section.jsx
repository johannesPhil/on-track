import { useState } from "react";
import Checklist from "./Checklist";
import OptionsMenu from "./OptionsMenu";

function Section({
  section,
  checklists,
  subchecklists,
  onToggle,
  onEdit,
  onDelete,
  onAddChecklist,
  onAddSubchecklist,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sectionChecklists = checklists.filter((c) => c.parentId === section.id);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between group">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-transform ${
                  isCollapsed ? "rotate-0" : "rotate-90"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div>
              <h2 className="text-xl font-semibold text-white drop-shadow-sm">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-white/80 text-sm mt-1 drop-shadow-sm">
                  {section.description}
                </p>
              )}
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <OptionsMenu
              type="section"
              onEdit={() => onEdit(section)}
              onDelete={() => onDelete(section.id)}
              onAddChild={() => onAddChecklist(section.id)}
            />
          </div>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-6 space-y-4">
          {sectionChecklists.map((checklist) => (
            <Checklist
              key={checklist.id}
              checklist={checklist}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddSubchecklist={onAddSubchecklist}
              subchecklists={subchecklists.filter(
                (s) => s.parentId === checklist.id
              )}
            />
          ))}
          {sectionChecklists.length === 0 && (
            <p className="text-white/60 text-sm italic drop-shadow-sm">
              No checklists yet. Click the menu to add one.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Section;
