import mongoose,{Schema} from "mongoose";
const agendaSchema = new Schema({
    description:{
        type:String,
        required:true,
    },
    startTime:{
        type:Date,
        required:true,
    },
    endTime:{
        type:Date,
        required:true,
    },
    eventId:{
        type:Schema.Types.ObjectId,
        ref:"Event",
    },
    speakerId:{
        type:Schema.Types.ObjectId,
        ref:"Speaker",
    },
    session:{
        type:Schema.Types.ObjectId,
        ref:"Session",
    },

},{timestamps:true});
export const Agenda = mongoose.model("Agenda",agendaSchema);