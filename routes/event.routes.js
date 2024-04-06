import { Router } from "express";
const router=Router();
import { createEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

// create a new event
router.post('/create',verifyJWT,createEvent);
export default router;