import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { PenSquareIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/Api.js";
import ConfirmModal from "./ConfirmModal";

export const NoteCard = ({ note, setNotes }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  // actual delete
  const handleDelete = async () => {
    try {
      navigate("/");
      await api.delete(`/api/notes/${note._id}`);

      toast.success("Note deleted successfully");
     
      setNotes((prev) => prev.filter((n) => n._id !== note._id));
     
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      toast.error("Failed to delete note");
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {/* NOTE CARD  */}
      <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition bg-white h-full flex flex-col justify-between">
        
        {/* TITLE  */}
        <Link to={`/note/${note._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 truncate hover:underline">
            {note.title}
          </h2>
        </Link>

        <p className="text-gray-700 mt-2">
          {note.content.substring(0, 100)}
          {note.content.length > 100 && "..."}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-400">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-3">
  {/* EDIT ICON */}
  <Link
    to={`/note/${note._id}`}
    onClick={(e) => e.stopPropagation()}
    className="p-1 hover:bg-gray-100 rounded"
  >
    <PenSquareIcon className="size-4 text-gray-600" />
  </Link>

  {/* DELETE ICON */}
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowDeleteModal(true);
    }}
    className="p-1 hover:bg-red-100 rounded"
  >
    <Trash className="size-4 text-red-500" />
  </button>
</div>

        </div>
      </div>

      {/* REUSABLE CONFIRM MODAL */}
      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Note?"
        description="This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        danger
      />
    </>
  );
};
