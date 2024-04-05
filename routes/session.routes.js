import { Router } from "express";
import { createSession } from "../controllers/session.controller.js";

const router = Router();

// Create a new session
router.post("/create", createSession);

export default router;
