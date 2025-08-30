import { useState, useEffect } from "react";

function Modal({ isOpen, onClose, onSave, type, data = null }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    parentId: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        parentId: data.parentId || null,
      });
    } else {
      setFormData({ title: "", description: "", parentId: null });
    }
  }, [data, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      ...formData,
      id: data?.id || Date.now(),
      type,
      completed: data?.completed || false,
    });
    onClose();
  };

  if (!isOpen) return null;

  const titles = {
    section: data ? "Edit Section" : "Add Section",
    checklist: data ? "Edit Checklist" : "Add Checklist",
    subchecklist: data ? "Edit Sub-checklist" : "Add Sub-checklist",
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl border border-white/30 ring-1 ring-white/20">
        <h2 className="text-xl font-semibold mb-4 text-white drop-shadow-sm">
          {titles[type]}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1 drop-shadow-sm">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/50"
              placeholder="Enter title..."
              required
            />
          </div>

          {type === "section" && (
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1 drop-shadow-sm">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/50 resize-none"
                rows="3"
                placeholder="Enter description..."
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white/80 border border-white/30 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
