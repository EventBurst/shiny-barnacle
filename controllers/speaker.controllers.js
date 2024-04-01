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

  export {getSpeakers};