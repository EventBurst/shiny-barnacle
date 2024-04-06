import mongoose, { Schema } from "mongoose";
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "published", "cancelled"],
    },
    sponsors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sponsor",
      },
    ],
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "Organizer",
    },
  },
  { timestamps: true }
);
export const Event = mongoose.model("Event", eventSchema);
