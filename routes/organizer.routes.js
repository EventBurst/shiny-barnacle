import { Router } from "express";
import { getOrganizers, loginOrganizer, registerOrganizer,refreshAccessToken } from "../controllers/organizer.controller.js";
const router = Router();

//get all Organizers
// Path: http://localhost:8002/api/shiny-barnacle/speaker/get-all
router.get("/get-all",getOrganizers);


//create Organizer
// Path: http://localhost:8002/api/shiny-barnacle/speaker/create
router.post("/create",registerOrganizer);

// created login Organizer
// Path: http://localhost:8002/api/shiny-barnacle/speaker/login
router.post("/login",loginOrganizer);

// refresh access token
router.route("/refresh-token").post(refreshAccessToken);
export default router;