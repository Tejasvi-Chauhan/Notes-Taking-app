import { Router } from "express";
import {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNote,
} from "../controller/notesController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

//  sab routes protected
router.get("/", authMiddleware, getAllNotes);

router.get("/:id", authMiddleware, getNote);

router.post("/", authMiddleware, addNote);

router.put("/:id", authMiddleware, updateNote);

router.delete("/:id", authMiddleware, deleteNote);

export default router;
