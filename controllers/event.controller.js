import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Event } from "../models/event.model.js";

const createEvent = asyncHandler(async (req, res) => {
  const {Name: name,Description: description,Duration: duration, status,SponsorIds:sponsorIds, SessionIds:sessionIds } = req.body;
  console.log(req.body);
  if ([name, description].some((value) => value.trim() === "")) {
    throw new ApiError(400, "Name and Description are required");
  }

  // create event
  console.log("organizer: ", req.organizer?._id);
  const event = await Event.create({
    name,
    description,
    duration,
    status:"published",
    sponsors: sponsorIds,
    sessions: sessionIds,
    organizer: req.organizer?._id,
  });

  // if (!event) throw new ApiError(400, "Event not created");
  res.status(201).json(new ApiResponse(201, "testing", "Event created"));
});

const getOrganizerEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ organizer: req.organizer?._id }).populate({
    path: "sponsors sessions organizer",
    select: "-password -refreshToken", // Exclude password and refreshToken fields
  });
  if (!events) throw new ApiError(404, "No events found");
  res.status(200).json(new ApiResponse(200, events, "Events retrieved"));
});

const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log("id: ",id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid event id");
  }
  const event = await Event.findById(id).populate({
    path: "sponsors sessions organizer",
    select: "-password -refreshToken", // Exclude password and refreshToken fields
  });
  if (!event) throw new ApiError(404, "Event not found");
  res.status(200).json(new ApiResponse(200, event, "Event retrieved"));
});
const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate({
    path: "sponsors sessions organizer",
    select: "-password -refreshToken", // Exclude password and refreshToken fields
  });
  if (!events) throw new ApiError(404, "No events found");
  res.status(200).json(new ApiResponse(200, events, "Events retrieved"));
});

const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {Name: name,Description: description,Duration: duration,Status: status, Sposnors: sponsors,Sessions: sessions } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid event id");
  }

  const event = await Event.findById(id);
  console.log("Event:", event);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.organizer._id.toString() !== req.organizer._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this event");
  }

  event.name = name ? name : event.name;
  event.description = description ? description : event.description;
  event.duration = duration ? duration : event.duration;
  event.status = status ? status : event.status;
  event.sponsors = sponsors ? sponsors : event.sponsors;
  event.sessions = sessions ? sessions : event.sessions;

  console.log("Updated Event:", event);

  await event.save();

  res.status(200).json(new ApiResponse(200, event, "Event updated"));
});


// delete event
const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid event id");
  }
  const event = await Event.findById(id);
  if (!event) throw new ApiError(404, "Event not found");
  if (event.organizer._id.toString() !== req.organizer._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this event");
  }
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent) throw new ApiError(400, "Event not deleted");
  res.status(200).json(new ApiResponse(200, event, "Event deleted"));
});

export {
  createEvent,
  getOrganizerEvents,
  getEventById,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
