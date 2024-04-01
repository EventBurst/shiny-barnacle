import {Router} from 'express';
import { createSpeaker, getSpeakers, updateSpeaker } from '../controllers/speaker.controllers.js';
const router= Router();
// Importing the controller

// Defining the routes

// Get all speakers
router.get('/get-all', getSpeakers);
// Create a new speaker
router.post('/create', createSpeaker);
// Update a speaker
router.put('/update/:id', updateSpeaker);
// Exporting the router
export default router;