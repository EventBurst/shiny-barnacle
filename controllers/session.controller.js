import Session from "../models/session.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// get all the sessions
const getAllSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find();
  if (!sessions) throw new ApiError("No sessions found", 404);
  res.status(200).json(new ApiResponse("success", sessions));
});

const createSession = asyncHandler(async (req, res) => {
  const { name, description, speaker, agenda } = req.body;

  // Stringify the speaker data before sending it
  const speakerData = JSON.stringify(speaker);

  let speakerId, agendaId;

  // Make a POST request to create the speaker
  await fetch(process.env.SPEAKER_API_URL + "create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: speakerData, // Use the stringified speaker data
  })
    .then((response) => {
      // Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data according to your application logic
      speakerId = data.data._id;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("There was a problem with the fetch operation:", error);
    });

  // Make a POST request to create the agenda
  await fetch(process.env.AGENDA_API_URL + "create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agenda), // Use the stringified agenda
  })
    .then((response) => {
      // Check if the response is successful (status 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data according to your application logic
      agendaId = data.data._id;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // Create a new session
  const session = await Session.create({
    name,
    description,
    speakerId,
    agendaId,
  });
  if (!session) throw new ApiError(400, "Session was not created");

  // Send a success response to the client if every thing is ok
  res.status(200).json(new ApiResponse(201, "no", "success"));
});

// Exporting the functions
export { createSession, getAllSessions };
