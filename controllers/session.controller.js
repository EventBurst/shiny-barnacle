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
  const { name, description, speaker } = req.body;

  // Check if speaker is there or not
  const response = await fetch(process.env.SPEAKER_API_URL + "create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: speaker,
  });

  res.status(200).json(new ApiResponse("success", { response }));
});

// Exporting the functions
export { getAllSessions, createSession };
