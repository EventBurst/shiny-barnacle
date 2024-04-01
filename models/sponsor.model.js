// Require Mongoose
import { Schema, model } from "mongoose";

// Define the Sponsor schema
const sponsorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contribution: {
    type: Number,
    required: true,
  },
});

// Create the Sponsor model
const Sponsor = model("Sponsor", sponsorSchema);

// Export the Sponsor model
export default Sponsor;
