import OptionsMenu from "./OptionsMenu";
import SubChecklist from "./SubChecklist";

function Checklist({
  checklist,
  onToggle,
  onEdit,
  onDelete,
  onAddSubchecklist,
  subchecklists,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between group">
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={checklist.completed}
            onChange={() => onToggle(checklist.id)}
            className="h-4 w-4 text-blue-400 rounded border-white/30 bg-white/10 backdrop-blur-sm"
          />
          <span
            className={`${
              checklist.completed
                ? "line-through text-white/50"
                : "text-white drop-shadow-sm"
            }`}
          >
            {checklist.title}
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <OptionsMenu
            type="checklist"
            onEdit={() => onEdit(checklist)}
            onDelete={() => onDelete(checklist.id)}
            onAddChild={() => onAddSubchecklist(checklist.id)}
          />
        </div>
      </div>

      {subchecklists && subchecklists.length > 0 && (
        <div className="ml-6 space-y-1">
          {subchecklists.map((sub) => (
            <SubChecklist
              key={sub.id}
              subchecklist={sub}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Checklist;
