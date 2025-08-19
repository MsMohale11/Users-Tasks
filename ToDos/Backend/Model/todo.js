import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    Tags : {
        type : [String],
       
    },
    IsPin : {
        type : Boolean,
        default : false
    },
    IsCompleted : {
        type : Boolean,
        default : false
    },
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Client",
        required : true , 
    }
} , {timestamps : true} );

const task = new mongoose.model("task" , todoSchema  );

export default task ;