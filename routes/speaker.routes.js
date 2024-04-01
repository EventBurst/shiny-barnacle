import {Router} from 'express';
import { getSpeakers } from '../controllers/speaker.controllers.js';
const router= Router();
// Importing the controller

// Defining the routes
// Get all speakers
router.get('/get-all', getSpeakers);


export default router;