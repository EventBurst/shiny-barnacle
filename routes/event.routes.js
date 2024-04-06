import { Router } from "express";
const router=Router();
import { createEvent, getEventById, getOrganizerEvents, updateEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// create a new event
router.post('/create',verifyJWT,createEvent);

// get  events created by organizer
router.get('/get-organizer-events',verifyJWT,getOrganizerEvents);

// get event by id
router.get('/get/:id',getEventById);

// update event by id
router.put('/update/:id',verifyJWT,updateEvent);

export default router;