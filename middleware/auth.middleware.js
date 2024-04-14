import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Organizer } from "../models/organizer.model.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  //we'r using req.header becuase in mobile there is no cookie stored so u have to get it from header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized request");
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const organizer = await Organizer.findById(decode?._id).select(
    "-password -refreshToken"
  );
  if (!organizer) throw new ApiError(401, "Invalid Access Token");
  req.organizer = organizer;
  next();
});
