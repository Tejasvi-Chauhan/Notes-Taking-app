import { Note } from "../model/Note.js";

/* ========================= */
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id, //  user-wise
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

/* ========================*/
export const getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id, // ownership check
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error fetching note" });
  }
};

/* ======================*/
export const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content,
      user: req.user._id, //  logged-in user
    });

    await newNote.save();

    res.status(201).json({
      message: "Note added successfully",
      note: newNote,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding note" });
  }
};

/* ========================*/
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // double check
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
};

/* =======================*/
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, //  ownership check
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
};
