import {Router} from 'express';
import { createSpeaker, getSpeakers } from '../controllers/speaker.controllers.js';
const router= Router();
// Importing the controller

// Defining the routes

// Get all speakers
router.get('/get-all', getSpeakers);
// Create a new speaker
router.post('/create', createSpeaker);

// Exporting the router
export default router;