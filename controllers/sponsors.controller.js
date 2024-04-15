import Sponsor from "../models/sponsor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// get all sponsor
const getAllSponsors = asyncHandler(async (req, res, next) => {
  const sponsors = await Sponsor.find();
  if (!sponsors) {
    return next(new ApiError("No sponsors found", 404));
  }
  res
    .status(200)
    .json(new ApiResponse("Sponsors fetched successfully", sponsors));
});

const createSponsor = asyncHandler(async (req, res, next) => {
  const {
    Name,
    Email,
    PhoneNumber: phoneNumber,
    Address,
    Contribution,
  } = req.body; // Renamed PhoneNumber to phoneNumber
  console.log(req.body);
  // Check if any of the required fields are empty or undefined
  if (
    !Name ||
    !Email ||
    !phoneNumber ||
    !Address ||
    !Contribution ||
    [Name, Email, phoneNumber, Address].some((value) => !value.trim())
  ) {
    // Adjusted for phoneNumber
    throw new ApiError(400, "All Fields are required");
  }

  const find = await Sponsor.findOne({ email: Email }); // Adjusted for CamelCase

  if (find) {
    return res.status(200).json(new ApiResponse(200, find, "Sponsor found"));
  }
  const sponsor = await Sponsor.create({
    name: Name,
    email: Email,
    phoneNumber,
    address: Address,
    contribution: Contribution,
  }); // Adjusted for phoneNumber

  console.log(sponsor);
  if (!sponsor) {
    return next(new ApiError("Sponsor could not be created", 400));
  }
  res
    .status(201)
    .json(new ApiResponse("Sponsor created successfully", sponsor));
});

// Update a sponsor
const updateSponsor = asyncHandler(async (req, res, next) => {
  const {
    Name: name,
    Email: email,
    PhoneNumber: phoneNumber,
    Address: address,
    Contribution: contribution,
    SponsorId: id,
  } = req.body;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid Sponsor ID", 400));
  }

  const sponsor = await Sponsor.findOne({ sponsorId: id });

  if (sponsor) {
    await Sponsor.updateOne(
      { sponsorId: id },
      {
        $set: {
          name,
          email,
          phoneNumber,
          address,
          contribution,
        },
      }
    );
  }
  if (!sponsor) {
    return next(new ApiError("Sponsor not found", 404));
  }
  res
    .status(200)
    .json(new ApiResponse("Sponsor updated successfully", sponsor));
});

//Delete a sponsor
const deleteSponsor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid Sponsor ID", 400));
  }

  const sponsor = await Sponsor.find({ sponsorId: id });

  console.log(sponsor);
  if (!sponsor) {
 throw new ApiError("Sponsor not found", 404);
  }

  await Sponsor.deleteOne({ sponsorId: id });

  res
    .status(200)
    .json(new ApiResponse("Sponsor deleted successfully", sponsor));
});

// Get a sponsor by ID
const getSponsorById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid Sponsor ID", 400));
  }
  const sponsor = await Sponsor.find({ sponsorId: id });

  if (!sponsor) {
    return next(new ApiError("Sponsor not found", 404));
  }
  res
    .status(200)
    .json(new ApiResponse("Sponsor fetched successfully", sponsor));
});

// Exporting the functions
export {
  getAllSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  getSponsorById,
};
