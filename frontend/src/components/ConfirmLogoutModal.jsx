const ConfirmLogoutModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* modal */}
      <div className="relative w-[90%] max-w-sm rounded-2xl bg-gradient-to-br from-slate-900 to-gray-900 p-6 shadow-2xl border border-white/10 animate-scaleIn">
        <h2 className="text-lg font-semibold text-white">
          Confirm Logout
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Are you sure you want to logout? You’ll need to login again to access your notes.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
