// Require Mongoose
import { Schema, model } from "mongoose";

// Define the Session schema
const sessionSchema = new Schema({
  speakerId: {
    type: Schema.Types.ObjectId,
    ref: "Speaker",
    required: true,
  },
  sessionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  agendaID: {
    type: Schema.Types.ObjectId,
    ref: "Agenda",
    required: true,
  },
});

// Create the Session model
const Session = model("Session", sessionSchema);

// Export the Session model
export default Session;
