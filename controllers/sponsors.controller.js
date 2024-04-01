import Sponsor from "../models/sponsor.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// get all sponsor
const getAllSponsors = asyncHandler(async (req, res, next) => {
  const sponsors = await Sponsor.find();
  if (!sponsors) {
    return next(new ApiError("No sponsors found", 404));
  }
  res.status(200).json(new ApiResponse("Sponsors fetched successfully", sponsors));
});



export {getAllSponsors};