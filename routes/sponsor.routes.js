import {Router} from 'express';
import { createSponsor, getAllSponsors, updateSponsor } from '../controllers/sponsors.controller.js';
const router=Router();

//Routes

// get all sponsors
router.get("/get-all", getAllSponsors);

// create a new sponsor
router.post("/create", createSponsor);

// update a sponsor
router.put("/update/:id", updateSponsor);

// Exporting the router
export default router;