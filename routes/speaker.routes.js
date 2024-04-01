import {Router} from 'express';
import { createSpeaker, deleteSpeaker, getSpeakers, updateSpeaker } from '../controllers/speaker.controllers.js';
const router= Router();
// Importing the controller

// Defining the routes

// Get all speakers
router.get('/get-all', getSpeakers);
// Create a new speaker
router.post('/create', createSpeaker);
// Update a speaker
router.put('/update/:id', updateSpeaker);
// Delete a speaker
router.delete('/delete/:id', deleteSpeaker);
// Exporting the router
export default router;