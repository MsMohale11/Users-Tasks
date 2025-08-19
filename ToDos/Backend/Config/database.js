import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb);
        console.log("Server Connected");
        
    } catch(err) {
        console.error("ERROR");
        process.exit(1)
    }
};

export default connectDB;