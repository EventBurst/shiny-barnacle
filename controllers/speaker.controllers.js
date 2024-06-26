import { Speaker } from "../models/speaker.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

//get all Speakers
const getSpeakers = asyncHandler(async (req, res) => {
  const speakers = await Speaker.find();
  if (!speakers) throw new ApiError("No Speakers Found", 404);
  return res
    .status(200)
    .json(new ApiResponse("Speakers retrieved successfully", speakers));
});

//get speaker by id
const getSpeakerById = asyncHandler(async (req, res) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ApiError("Invalid Speaker ID", 400));
  }

  const speaker = await Speaker.findOne({ speakerId: req.params.id });

  console.log("", speaker);

  if (!speaker) throw new ApiError("Speaker not found", 404);
  return res
    .status(200)
    .json(new ApiResponse("Speaker retrieved successfully", speaker));
})

// create a new Speaker
const createSpeaker = asyncHandler(async (req, res) => {
  const { Name: name, Email: email, PhoneNumber: phoneNumber } = req.body;
  if ([name, email, phoneNumber].some((value) => value.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }

  const find = await Speaker.findOne({ email });

  if (find) {
    return res.status(200).json(new ApiResponse(200, find, "Speaker found"));
  }

  const speaker = await Speaker.create({ name, email, phoneNumber });
  if (!speaker) throw new ApiError(400, "Speaker could not be created");
  return res
    .status(201)
    .json(new ApiResponse(201, speaker, "Speaker created successfully"));
});

// update a Speaker
const updateSpeaker = asyncHandler(async (req, res) => {
  const { Name: name, Email: email, PhoneNumber: phoneNumber } = req.body;

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Speaker ID");
  }

  if ([name, email, phoneNumber].some((value) => value.trim() === "")) {
    throw new ApiError(400, "All Fields are required");
  }

  const find = await Speaker.findOne({ speakerId: req.params.id });

  if (find) {
    await Speaker.updateOne(
      { speakerId: req.params.id },
      {
        $set: {
          name,
          email,
          phoneNumber,
        },
      }
    )
  }

  if (!find) throw new ApiError(400, "Speaker could not be updated");
  return res
    .status(200)
    .json(new ApiResponse(200, find, "Speaker updated successfully"));
});

// delete a Speaker
const deleteSpeaker = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Speaker ID");
  }

  const speaker = await Speaker.findOne({ speakerId: id });

  if (!speaker) 
  {
    throw new ApiError(404, "Speaker not found");
  }

  // Delete the Speaker
  await Speaker.deleteOne({ speakerId: id });

  return res
    .status(200)
    .json(new ApiResponse(200, speaker, "Speaker deleted successfully"));
});
// Exporting the functions
export { getSpeakers, createSpeaker, updateSpeaker, deleteSpeaker, getSpeakerById };
