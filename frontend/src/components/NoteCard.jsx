import { Link } from "react-router";
import { useState } from "react";
import { PenSquareIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/Api.js";

export const NoteCard = ({ note, setNotes }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  // open modal
  const openDeleteModal = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  // actual delete
  const handleDelete = async () => {
    try {
      await api.delete(`/api/notes/${noteToDelete}`);

      toast.success("Note deleted successfully");

      setNotes((prevNotes) =>
        prevNotes.filter((n) => n._id !== noteToDelete)
      );
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      toast.error("Failed to delete note");
    } finally {
      setShowDeleteModal(false);
      setNoteToDelete(null);
    }
  };

  return (
    <>
      {/* NOTE CARD */}
      <Link to={`/note/${note._id}`}>
        <div className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition bg-white h-full flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{note.title}</h2>

          <p className="text-gray-700">
            {note.content.substring(0, 100)}
            {note.content.length > 100 && "..."}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-400 mt-3">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>

            <div className="flex items-center gap-2">
              <PenSquareIcon className="size-4" />

              {/* DELETE BUTTON */}
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openDeleteModal(note._id);
                }}
              >
                <Trash className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-[90%] max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold text-white">
              Delete Note?
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
