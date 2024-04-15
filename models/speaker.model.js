import mongoose, { Schema } from "mongoose";
const speakerSchema = new Schema({
  speakerId: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
});

export const Speaker = mongoose.model("Speaker", speakerSchema);
