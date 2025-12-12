import { Router } from "express";
import {
  addNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNote,
} from "../controller/notesController.js";

const router = Router();

router.get("/", getAllNotes);

router.get("/:id", getNote);

router.post("/", addNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
