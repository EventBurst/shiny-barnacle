import { Agenda } from "../models/agenda.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// get all agendas
const getAllAgendas = asyncHandler(async (_, res) => {
  const agendas = await Agenda.find();
  if (!agendas) throw new ApiError(404, "Agenda not found");
  return res.status(200).json(new ApiResponse("Agendas found", agendas));
});

// get agenda by id
const getAgendaById = asyncHandler(async (req, res, next) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError("Invalid Agenda ID", 400));
  }

  const agenda = await Agenda.findOne({ agendaId: req.params.id });
  if (!agenda) throw new ApiError()
  return res.status(200).json(new ApiResponse("Agenda found", agenda));
})

// create a new agenda
const createAgenda = asyncHandler(async (req, res) => {
  const { Name: name, Description: description, StartTime: startTime, EndTime: endTime } = req.body;
  if (
    [name, description, startTime, endTime].some((field) => field === undefined)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the agenda already exists
  const findAgenda = await Agenda.findOne({ name });
  if (findAgenda) {
    // If so then return that
    return res
      .status(200)
      .json(new ApiResponse(200, findAgenda, "Agenda already exists"));
  }

  // Start Date Time
  const startDateTime = new Date(startTime);
  const endDateTime = new Date(endTime);

  const agenda = await Agenda.create({
    name,
    description,
    startTime: startDateTime,
    endTime: endDateTime,
  });
  if (!agenda) throw new ApiError(400, "Agenda not created");
  return res.status(201).json(new ApiResponse(201, agenda, "Agenda created"));
});

// update an agenda
const updateAgenda = asyncHandler(async (req, res) => {
  const { Name: name, Description: description, StartTime: startTime, EndTime: endTime } = req.body;
  if (
    [name, description, startTime, endTime].some((field) => field === undefined)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const agenda = await Agenda.findOne({ agendaId: req.params.id });
  if (!agenda) throw new ApiError(404, "Agenda not found");

  if (agenda) {
    await Agenda.updateOne(
      { agendaId: req.params.id },
      {
        name,
        description,
        startTime,
        endTime,
      }
    )
  }
 
  return res.status(200).json(new ApiResponse(200, agenda, "Agenda updated"));
});

// delete an agenda
const deleteAgenda = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new ApiError(400, "Invalid Agenda ID");
  }
  const { id } = req.params;
  const agenda = await Agenda.find({ agendaId: id });
  if (!agenda) throw new ApiError(404, "Agenda not found");

  if (agenda) {
    await Agenda.deleteOne({ agendaId: id });  
  }

  return res.status(200).json(new ApiResponse(200, agenda, "Agenda deleted"));
});

// exporting all the endpoints
export { getAllAgendas, createAgenda, updateAgenda, deleteAgenda, getAgendaById };
