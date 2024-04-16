import { Router } from "express";
const router = Router();
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getOrganizerEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// create a new event
router.post("/create", verifyJWT, createEvent);

// get  events created by organizer
router.get("/get-organizer-events", verifyJWT, getOrganizerEvents);

// get event by id
router.get("/get/:id", getEventById);

// get all events
router.get("/get-all", getAllEvents);

// update event by id
router.put("/update/:id", verifyJWT, updateEvent);

// delete event by id
router.delete("/delete/:id", verifyJWT, deleteEvent);

// export router
export default router;
