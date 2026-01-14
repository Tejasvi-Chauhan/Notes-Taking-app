import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../lib/Api.js";

export const NoteDetailPage = () => {
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        console.log("Failed to fetch note", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/api/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (err) {
      console.log("Failed to save note", err);
    }
    setSaving(false);
  };
  if (loading) {
    return (
      <div className="text-center text-primary py-10">
        <LoaderIcon className="animate-spin mx-auto mb-2" />
        Loading note...
      </div>
    );
  }
  if (!note) {
    return (
      <div className="text-center text-red-500 py-10">Note not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto p-4 mt-6">
          <div className="flex items-center mb-4">
            <Link to="/" className="btn btn-ghost mb-4">
              <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back to Notes
            </Link>
          </div>
          <div className="card bg-base-300 shadow-md rounded-lg p-6">
            <div className="card-body">
              <div className="mb-4">
                <label className="block text-gray-400 font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-300"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 font-bold mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  placeholder="Write your note here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-base-300 h-40"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={async () => {
                    handleSave();
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
