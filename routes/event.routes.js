import { Router } from "express";
const router=Router();
import { createEvent, getOrganizerEvents } from "../controllers/event.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// create a new event
router.post('/create',verifyJWT,createEvent);

// get  events created by organizer
router.get('/get-organizer-events',verifyJWT,getOrganizerEvents);
export default router;