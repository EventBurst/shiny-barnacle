import { Router } from "express";
import {
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
} from "../controllers/session.controller.js";

const router = Router();

// Create a new session
router.post("/create", createSession);

// Get All Sessions
router.get("/get-all", getAllSessions);

// Delete a session
router.delete("/delete/:id", deleteSession);

// Update a session
router.put("/update/:id", updateSession);
export default router;
