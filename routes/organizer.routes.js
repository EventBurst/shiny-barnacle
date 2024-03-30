import { Router } from "express";
import { getOrganizers, registerOrganizer } from "../controllers/organizer.controller.js";
const router = Router();

//get all Organizers
router.get("/get-all",getOrganizers);
//create Organizer
router.post("/create",registerOrganizer);

export default router;