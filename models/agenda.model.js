import mongoose, { Schema } from "mongoose";
const agendaSchema = new Schema(
  {
    agendaId: {
      type: Schema.Types.ObjectId,
      auto: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const Agenda = mongoose.model("Agenda", agendaSchema);
