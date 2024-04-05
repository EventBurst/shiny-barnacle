import Session from "../models/session.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// get all the sessions
const getAllSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find();
  if (!sessions) throw new ApiError("No sessions found", 404);
  res.status(200).json(new ApiResponse("success", sessions));
});

// Create a new session
const createSession = asyncHandler(async (req, res) => {
  const { speakerId, sessionName, description, agendaID } = req.body;
  if ([speakerId, sessionName, description, agendaID].includes(undefined)) {
    throw new ApiError("Please provide all the required fields", 400);
  }
  const session = await Session.create({
    _id: new mongoose.Types.ObjectId(),
    speakerId,
    sessionName,
    description,
    agendaID,
  });

  res.status(201).json(new ApiResponse("success", session));
});

// Exporting the functions
export { getAllSessions, createSession };
