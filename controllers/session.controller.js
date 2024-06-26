import Session from "../models/session.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// get all the sessions
const getAllSessions = asyncHandler(async (_, res) => {
  const sessions = await Session.find();
  if (!sessions) throw new ApiError("No sessions found", 404);
  res.status(200).json(new ApiResponse("success", sessions));
});

// delete a session
const deleteSession = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError("Invalid Session ID", 400));
  }

const session = await Session.findOne({ sessionId: req.params.id });

  if (session) {
    await Session.deleteOne({ sessionId: req.params.id });
  }

  if (!session) throw new ApiError("No session found", 404);
  res.status(200).json(new ApiResponse("success", "Session Deleted"));
});

// update a session
const updateSession = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError("Invalid Session ID", 400));
  }

  const session = await Session.findOne({ sessionId: req.params.id });

  if (session) {
    await Session.updateOne(
      { sessionId: req.params.id },
      {
        $set: {
          name: req.body.Name,
          description: req.body.Description,
          speakerId: req.body.speakerId ? req.body.speakerId: session.speakerId,
          agendaId: req.body.agendaId ? req.body.agendaId : session.agendaId,
        },
      }
    );
  }

  if (!session) throw new ApiError("No session found", 404);
  res.status(200).json(new ApiResponse("success", "Session Updated"));
});

// create a new session
const createSession = asyncHandler(async (req, res) => {
  const {Name: name,Description: description,speakerId: speakerId, agendaId:agendaId } = req.body;
  console.log(req.body);
  
  // Create a new session
  const session = await Session.create({
    name,
    description,
    speakerId,
    agendaId,
  });
  if (!session) throw new ApiError(400, "Session was not created");

  // Send a success response to the client if every thing is ok
  res.status(200).json(new ApiResponse(201, session, "success"));
});

// get session by id
const getSessionById = asyncHandler(async (req, res) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError("Invalid Session ID", 400));
  }

  // Get a session
  const session = await Session.findOne({ sessionId: req.params.id });


  if (!session) throw new ApiError();

  res.status(200).json(new ApiResponse("success", session));
})

// Exporting the functions
export { createSession, getAllSessions, deleteSession, updateSession, getSessionById };
