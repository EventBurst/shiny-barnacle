import { Router } from "express";
import {
  createSponsor,
  deleteSponsor,
  getAllSponsors,
  updateSponsor,
  getSponsorById,
} from "../controllers/sponsors.controller.js";
const router = Router();

//Routes

// get all sponsors
router.get("/get-all", getAllSponsors);

// create a new sponsor
router.post("/create", createSponsor);

// update a sponsor
router.put("/update/:id", updateSponsor);

// delete a sponsor
router.delete("/delete/:id", deleteSponsor);

// get by id
router.get("/get/:id", getSponsorById);

// Exporting the router
export default router;
