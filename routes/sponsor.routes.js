import {Router} from 'express';
import { getAllSponsors } from '../controllers/sponsors.controller.js';
const router=Router();

//Routes

// get all sponsors
router.get("/get-all", getAllSponsors);


// Exporting the router
export default router;