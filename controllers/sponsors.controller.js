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

// create a new sponsor
const createSponsor = asyncHandler(async (req, res, next) => {
    const {name,email,phoneNumber, address, contribution }= req.body;
    if (
        [name,email,phoneNumber,address].some((value) => value.trim() === "")
      ) {
        throw new ApiError(400, "All Fields are required");
      }
  const sponsor = await Sponsor.create(req.body);
  if (!sponsor) {
    return next(new ApiError("Sponsor could not be created", 400));
  }
  res.status(201).json(new ApiResponse("Sponsor created successfully", sponsor));
});

// Update a sponsor
const updateSponsor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid Sponsor ID", 400));
  }
  const sponsor = await Sponsor.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!sponsor) {
    return next(new ApiError("Sponsor not found", 404));
  }
  res.status(200).json(new ApiResponse("Sponsor updated successfully", sponsor));
});

//Delete a sponsor
const deleteSponsor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid Sponsor ID", 400));
  }
  const sponsor = await Sponsor.findByIdAndDelete(id);
  if (!sponsor) {
    return next(new ApiError("Sponsor not found", 404));
  }
  res.status(200).json(new ApiResponse("Sponsor deleted successfully", sponsor));
});

// Exporting the functions
export {getAllSponsors, createSponsor, updateSponsor, deleteSponsor};