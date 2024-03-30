import mongoose from "mongoose";
import { Organizer } from "../models/organizer.model.js";
import jwt from "jsonwebtoken";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

//generate access and refresh token
const generateAccessAndRefreshToken = async (organizer) => {
    try {
      const refreshToken = organizer.generateRefreshToken();
      const accessToken = organizer.generateAccessToken();
      organizer.refreshToken = refreshToken;
      await organizer.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
     throw new ApiError(500, "Something Went Wrong While Generating Token");
    }
  };
//get all Organizers
const getOrganizers = asyncHandler(async (req, res) => {
    const organizers = await Organizer.find();
    return res.status(200).json(new ApiResponse(200, organizers, "Organizers retrieved successfully"));
  });

//register Organizer
const registerOrganizer = asyncHandler(async (req, res) => {
    //get Organizer details from frontend
    const { fullname, email, password } = req.body;
  
    //validation-not empty
    if (
      [fullname, email, password].some((value) => value.trim() === "")
    ) {
      throw new ApiError(400, "All Fields are required");
    }
  
    //check if Organizer already exists :email
    const existedOrganizer = await Organizer.findOne({ email: email });
    if (existedOrganizer) {
      throw new ApiError(409, "Organizer with email already exists");
    }
    //create organizer object -create entry in db
    const organizer = await Organizer.create({
      fullname,
      email,
      password,
    });
  
    // // remove password and refresh token field from response
    const createdOrganizer = await Organizer.findById(organizer._id).select(
      "-password -refreshToken"
    );
  
    // check for Organizer creation
    if (!createdOrganizer) throw new ApiError(500, "Organizer creation failed");
  
    // return response
    return res
      .status(201)
      .json(new ApiResponse(200, createdOrganizer, "Organizer created successfully"));
  });
  
  // login Organizer
  const loginOrganizer = asyncHandler(async (req, res) => {
    //get Organizer details from frontend
    const { email, password } = req.body;
  
    //validation-not empty
    if ([email, password].some((value) => value.trim() === "")) {
      throw new ApiError(400, "All Fields are required");
    }
  
    //check if Organizer exists :email
    const organizer = await Organizer.findOne({ email: email });
    if (!organizer) {
      throw new ApiError(404, "Organizer with email not found");
    }
  
    //check if password is correct
    const isPasswordCorrect = await organizer.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid Credentials");
    }
  
    //generate access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      organizer
    );

    // remove password and refresh token field from response
    const loggedInOrganizer = await Organizer.findById(organizer._id).select(
        "-password -refreshToken");
        const option = {
            httpOnly: true,
            secure: true,
          };
          return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json(
              new ApiResponse(
                200,
                { loggedInOrganizer, accessToken, refreshToken },
                "Organizer Logged In Successfully"
              )
            );
  });
  const refreshAccessToken = asyncHandler(async (req, res) => {
    //get refresh token from organizer
    const incomingRefershToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefershToken) throw new ApiError(401, "Unauthorized request");
    // decode  token
    const decoded = jwt.verify(
      incomingRefershToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const organizer = await Organizer.findById(decoded?._id);
    if (!organizer) {
      throw new ApiError(401, "Invalid Refresh Token");
    }
    // verify token with the token stored in the organizer db
    if (organizer.refreshToken !== incomingRefershToken) {
      throw new ApiError(401, "Invalid Refresh Token");
    }
    // if valid, generateAccessAndRefreshToken
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(organizer);
    // send cookies response to the organizer
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token Refreshed Successfully"
        )
      );
  });
  
  
  export { registerOrganizer, getOrganizers,loginOrganizer,refreshAccessToken};