import {Router} from 'express';
import { createSponsor, getAllSponsors } from '../controllers/sponsors.controller.js';
const router=Router();

//Routes

// get all sponsors
router.get("/get-all", getAllSponsors);

// create a new sponsor
router.post("/create", createSponsor);


// Exporting the router
export default router;