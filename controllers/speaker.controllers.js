import{ Speaker} from "../models/speaker.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import mongoose from "mongoose";

//get all Speakers
const getSpeakers = asyncHandler(async (req, res) => {
    const speakers = await Speaker.find();
    if(!speakers) throw new ApiError(404,"No Speakers Found");
    return res.status(200).json(new ApiResponse(200, speakers, "Speakers retrieved successfully"));
  });

// create a new Speaker
const createSpeaker=asyncHandler(async(req,res)=>{
  const {name,email,phoneNumber}=req.body;
  if (
    [name,email,phoneNumber].some((value) => value.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  const speaker=await Speaker.create({name,email,phoneNumber});
  if(!speaker) throw new ApiError(400,"Speaker could not be created");
  return res.status(201).json(new ApiResponse(201,speaker,"Speaker created successfully"));

})
  export {getSpeakers, createSpeaker};