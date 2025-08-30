function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl border border-white/30 ring-1 ring-white/20">
        <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-sm">
          {title}
        </h3>
        <p className="text-white/80 mb-6 drop-shadow-sm">{message}</p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white/80 border border-white/30 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-500 transition-all duration-200 shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
