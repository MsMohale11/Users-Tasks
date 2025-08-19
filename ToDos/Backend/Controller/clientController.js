import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from "../Model/login.js";

export const clientLog = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log(Email, Password);

    const User = await Client.findOne({ Email });
    if (!User) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const clientMatch = await bcrypt.compare(Password, User.Password);
    if (!clientMatch) {
      return res.status(400).json({ message: "Invalid User" });
    }

    const token = jwt.sign(
      { id: User._id, Email: User.Email },
      process.env.JWT_SECRET_KEY,
      // {
      //   expiresIn: "1d",
      // }
    );

    res.status(200).json({
      message: "Login Successfully",
      token,
      UserId: User._id,
    });
  } catch (error) {
    console.error("Login Error", error);
    return res.status(500).json({ message: "Error Occuring In Login" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    console.log(Email, Password, Username);

    const ClientExist = await Client.findOne({ Email });
    // console.log(Email);

    if (ClientExist) {
      return res.status(400).json({ message: "Client already loggedIn" });
    }

    const hashpasswrd = await bcrypt.hash(Password, 10);
    const newclient = new Client({
    Username,
     Email, 
     Password: hashpasswrd 
    });

    await newclient.save();
    res.status(201).json({ message: "Client Registered Successfully" });
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// export const verifyUser = (res, req, next) => {
//   const token = req;
//   if (!token) {
//     return res.status(403).json({ message: "Token not Found!" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
//     if (error) {
//       return res.status(403).json({ message: "Invalid Information!" });
//     }
//     req.UserId = decoded.UserId;
//     next();
//   });
// };
