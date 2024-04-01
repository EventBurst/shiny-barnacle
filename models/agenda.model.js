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
        required:true,
    },
    speakerId:{
        type:Schema.Types.ObjectId,
        ref:"Speaker",
        required:true,
    },
    session:{
        type:Schema.Types.ObjectId,
        ref:"Session",
        required:true,
    },

},{timestamps:true});
export const Agenda = mongoose.model("Agenda",agendaSchema);