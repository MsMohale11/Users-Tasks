import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/database.js";
import loginRoutes from "./Routes/loginRoutes.js";
import todoRouter from "./Routes/todoRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;
console.log(port);

connectDB();

app.use(
  cors({
    origin: "http://localhost:5176",
    
    credentials: true,
  })
);
app.use("/api/client", loginRoutes);
app.use("/api/task", todoRouter);

app.listen(port, () => {
 console.log(`Server running at https://users-tasks-1.onrender.com`);
});
