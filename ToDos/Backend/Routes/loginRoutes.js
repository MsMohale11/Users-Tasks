import express from "express";
import { clientLog, signUp } from "../Controller/clientController.js";



const router = express.Router();

router.post("/login" , clientLog );
router.post("/signup" , signUp);
// router.get("/verifyuser" , verifyUser);


export default router ;