import { Router } from "express";
import {
  createSpeaker,
  deleteSpeaker,
  getSpeakers,
  updateSpeaker,
} from "../controllers/speaker.controllers.js";
const router = Router();
// Importing the controller

// Defining the routes

// Get all speakers
//Path: http://localhost:8002/api/shiny-barnacle/speaker/get-all
router.get("/get-all", getSpeakers);

// Create a new speaker
//Path: http://localhost:8002/api/shiny-barnacle/speaker/create
router.post("/create", createSpeaker);

// Update a speaker
//Path: http://localhost:8002/api/shiny-barnacle/speaker/update/:id
router.put("/update/:id", updateSpeaker);

// Delete a speaker
//Path: http://localhost:8002/api/shiny-barnacle/speaker/delete/:id
router.delete("/delete/:id", deleteSpeaker);

// Exporting the router
export default router;
