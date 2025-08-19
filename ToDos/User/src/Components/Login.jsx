import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [form, setform] = useState({ Email: "", Password: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleData = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      console.log("Data Matched", form);
      const response = await axios.post(
        "http://localhost:5000/api/client/login",
        form
      );
      console.log("Server responsing", response.data);

      const { token, UserId } = response.data;
      console.log(response.data.token);

      localStorage.setItem("token", token);
      localStorage.setItem("UserId", UserId);
      setform({ Email: "", Password: "" });
      setTimeout(() => setIsSubmit(false), 1000);

      navigate("/task");
    } catch (error) {
      console.error("Login Failed", error);
      alert("Invalid email or password");
      setIsSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue managing your tasks effortlessly.
        </p>

        <form onSubmit={submit} className="space-y-5">

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
              onChange={handleData}
              value={form.Email}
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
              onChange={handleData}
              value={form.Password}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>


          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transform transition hover:scale-[1.02] ${isSubmit
                ? "bg-green-500 hover:bg-green-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              }`}
          >
            {isSubmit ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
