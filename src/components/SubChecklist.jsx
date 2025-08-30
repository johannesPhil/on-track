import OptionsMenu from "./OptionsMenu";

function SubChecklist({ subchecklist, onToggle, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center space-x-2 flex-1">
        <input
          type="checkbox"
          checked={subchecklist.completed}
          onChange={() => onToggle(subchecklist.id)}
          className="h-3 w-3 text-blue-400 rounded border-white/30 bg-white/10"
        />
        <span
          className={`text-sm ${
            subchecklist.completed
              ? "line-through text-white/40"
              : "text-white/80 drop-shadow-sm"
          }`}
        >
          {subchecklist.title}
        </span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <OptionsMenu
          type="subchecklist"
          onEdit={() => onEdit(subchecklist)}
          onDelete={() => onDelete(subchecklist.id)}
        />
      </div>
    </div>
  );
}

export default SubChecklist;
