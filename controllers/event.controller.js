import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import {Event} from "../models/event.model.js";


const createEvent = asyncHandler(async (req, res) => {
    const {name,description,duration,status,sponsors,sessions} =req.body;
    if (
        [name, description].some((value) => value.trim() === "")
      ) {
        throw new ApiError(400, "Name and Description are required");
      }

    // get sponsor ids
     const sponsorIds= await  getSponsorId(sponsors);

    // get session ids
     const sessionIds= await  getSessionId(sessions);
    
    // create event
    console.log("organizer: ",req.organizer?._id)
    const event = await Event.create({
        name,
        description,
        duration,
        status,
        sponsors:sponsorIds,
        sessions:sessionIds,
        organizer: req.organizer?._id
    });

    if(!event) throw new ApiError(400, "Event not created");
    res.status(201).json(new ApiResponse(201, event,"Event created"));
    });

    const getSponsorId = async (sponsors) => {
        const sponsorIds = [];
    
        // Map each sponsor to a promise returned by fetch
        const fetchPromises = sponsors.map(async (sponsor) => {
            try {
                const response = await fetch(process.env.SPONSOR_API_URL + "create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(sponsor),
                });
    
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
    
                const data = await response.json();
                sponsorIds.push(data.data._id);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        });
    
        // Wait for all fetch requests to complete
        await Promise.all(fetchPromises);
        // Once all requests are completed, return the sponsorIds array
        return sponsorIds;
    };

    const getSessionId= async (sessions) => {
        const sessionIds = [];
    
        // Map each session to a promise returned by fetch
        const fetchPromises = sessions.map(async (session) => {
            try {
                const response = await fetch(process.env.SESSION_API_URL + "create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(session),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                // console.log("data: ",data.data._id)
                sessionIds.push(data.data._id);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        });
    
        // Wait for all fetch requests to complete
        await Promise.all(fetchPromises);
        // Once all requests are completed, return the sponsorIds array
        // console.log("Id: ",sessionIds[0])
        return sessionIds;
    };

const getOrganizerEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({organizer:req.organizer?._id})
    .populate({
        path: "sponsors sessions organizer",
        select: "-password -refreshToken" // Exclude password and refreshToken fields
    });
    if(!events) throw new ApiError(404, "No events found");
    res.status(200).json(new ApiResponse(200, events, "Events retrieved"));
  });

const getEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log("id: ",id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid event id");
    }
    const event = await Event.findById(id)
    .populate({
        path: "sponsors sessions organizer",
        select: "-password -refreshToken" // Exclude password and refreshToken fields
    });
    if (!event) throw new ApiError(404, "Event not found");
    res.status(200).json(new ApiResponse(200, event, "Event retrieved"));
});

const updateEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, duration, status, sponsors, sessions } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid event id");
    }
    const event = await Event.findById(id);
    if (!event) throw new ApiError(404, "Event not found");
    event.name = name || event.name;
    event.description = description || event.description;
    event.duration = duration || event.duration;
    event.status = status || event.status;
    event.sponsors = sponsors || event.sponsors;
    event.sessions = sessions || event.sessions;
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
    if(event.organizer._id.toString() !== req.organizer._id.toString()){
        throw new ApiError(403, "You are not authorized to delete this event");
    }
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) throw new ApiError(400, "Event not deleted");
    res.status(200).json(new ApiResponse(200, event, "Event deleted"));
});

export { createEvent, getOrganizerEvents, getEventById, updateEvent, deleteEvent};