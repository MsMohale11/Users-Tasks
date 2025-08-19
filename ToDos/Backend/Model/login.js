import mongoose from "mongoose"


const clientSchema = new mongoose.Schema({
    Username : {
        type : String,
         required: true,
    },
    Email : {
        type : String,
        require : true
    }, 
    Password : {
        type : String
    }
});

const Client = mongoose.model("Client" , clientSchema);
export default Client;