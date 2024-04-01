import mongoose,{Schema} from "mongoose";
const speakerSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
    }
});

export const Speaker = mongoose.model("Speaker",speakerSchema);