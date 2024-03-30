import { Router } from "express";
import { getOrganizers, loginOrganizer, registerOrganizer } from "../controllers/organizer.controller.js";
const router = Router();

//get all Organizers
router.get("/get-all",getOrganizers);
//create Organizer
router.post("/create",registerOrganizer);
// //login Organizer
router.post("/login",loginOrganizer);

export default router;