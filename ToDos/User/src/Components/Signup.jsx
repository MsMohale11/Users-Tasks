import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [isForm, setIsForm] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };

  const submission = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      console.log("Data Received", isForm);
      const res = await axios.post(
        "http://localhost:5000/api/client/signup",
        isForm
      );
      console.log("Server Responsing", res.data);

      // localStorage.setItem("UserId", res.data.UserId);
      setTimeout(() => setIsSubmit(false), 1000);
      navigate("/task");
    } catch (error) {
      setIsSubmit(false);
      console.error("Signup Error:", error);
      alert("Signup failed. Please try again.");
      // res.status(500).json({ message :"Signup error:" , error});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Join us today and organize your tasks like a pro!
        </p>

        <form onSubmit={submission} className="space-y-5">

          <div>
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              onChange={handleForm}
              value={isForm.Username}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              onChange={handleForm}
              value={isForm.Email}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              onChange={handleForm}
              value={isForm.Password}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>


          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transform transition hover:scale-[1.02] ${isSubmit
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              }`}
          >
            {isSubmit ? "Registering..." : "Register"}
          </button>
        </form>


        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>

  );
};

export default Signup;
