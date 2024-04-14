import { Router } from "express";
import {
  getOrganizers,
  loginOrganizer,
  registerOrganizer,
  refreshAccessToken,
} from "../controllers/organizer.controller.js";
const router = Router();

//get all Organizers
router.get("/get-all", getOrganizers);
//create Organizer
router.post("/create", registerOrganizer);
// created login Organizer
router.post("/login", loginOrganizer);
// refresh access token
router.route("/refresh-token").post(refreshAccessToken);
export default router;
