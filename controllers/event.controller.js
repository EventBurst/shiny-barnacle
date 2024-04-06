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
    
export { createEvent };