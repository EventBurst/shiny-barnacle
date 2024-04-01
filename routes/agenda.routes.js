import { Router } from "express";
import {
  createAgenda,
  deleteAgenda,
  getAllAgendas,
  updateAgenda,
} from "../controllers/agenda.controller.js";

const router = Router();

// Get All Agendas
router.get("/get-all", getAllAgendas);

// Create a new Agenda
router.post("/create", createAgenda);

// Update an Agenda
router.put("/update/:id", updateAgenda);

// Delete an Agenda
router.delete("/delete/:id", deleteAgenda);

// Exporting the router
export default router;
