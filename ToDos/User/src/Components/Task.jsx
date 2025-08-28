import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Task = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You're not logged in.");
      navigate("/");
    }
  }, [token, navigate]);

  console.log(token);

  const saveTask = async (e) => {
    e.preventDefault();

    if (!taskName || !description) {
      alert("Task Name and Description are required");
      return;
    }

    const newTask = {
      Name: taskName,
      Description: description,
      Tags: tags,
      IsCompleted: isCompleted,
      IsPin: isPinned,
    };

    try {
      const res = await axios.post(
        "https://users-tasks-1.onrender.com/api/task/task",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Task Saved Successfully!", res.data);

      setTaskList((prev) => [...prev, res.data.newTask]);
      setTaskName("");
      setDescription("");
      setTags([]);
      setNewTag("");
      setIsCompleted(false);
      setIsPinned(false);
    } catch (error) {
      console.error("Error Saving Task", error);
      alert("Failed to save task. Please try again.");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const signup = () => navigate("/signup");
  const login = () => navigate("/");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };



  return (
    <div className="md:mx-40 lg:mx-60 py-10 space-y-10">

      <div className="flex flex-wrap gap-4 justify-center">
        {[
          { label: "Sign Up", color: "blue", action: signup },
          { label: "Login", color: "green", action: login },
          { label: "Logout", color: "red", action: handleLogout },
        ].map((btn, idx) => {
          const colorMap = {
            blue: "bg-blue-600 hover:bg-blue-700",
            green: "bg-green-600 hover:bg-green-700",
            red: "bg-red-600 hover:bg-red-700",
          };

          return (
            <button
              key={idx}
              onClick={btn.action}
              className={`p-3 w-40 rounded-xl font-semibold text-white shadow-md transition duration-200 ${colorMap[btn.color]}`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>



      <div className="bg-white p-8 rounded-2xl shadow-lg border">
        <h1 className="text-center font-extrabold text-3xl text-gray-800">
          To-Do Task Manager
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Organize your tasks efficiently
        </p>


        <input
          type="text"
          placeholder="Task Title"
          className="mt-6 border border-gray-300 w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />


        <textarea
          placeholder="Task Description..."
          className="mt-4 border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />


        <div className="flex gap-3 mt-4">
          <input
            type="text"
            placeholder="Add Tag"
            className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button
            type="button"
            className="px-5 py-2 rounded-xl font-semibold bg-purple-600 text-white shadow hover:bg-purple-700 transition"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}


        <div className="mt-6 flex flex-col gap-3">
          <label className="text-lg font-medium flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
              className="h-4 w-4 accent-green-600"
            />
            Mark as Completed
          </label>
          <label className="text-lg font-medium flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPinned}
              onChange={() => setIsPinned(!isPinned)}
              className="h-4 w-4 accent-yellow-500"
            />
            Pin this Task
          </label>
        </div>


        <button
          className="mt-6 w-full py-3 rounded-xl font-semibold bg-green-600 text-white shadow-md hover:bg-green-700 transition duration-200"
          onClick={saveTask}
        >
          Save Task
        </button>
      </div>

    
      <div className="bg-white p-8 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          Saved Tasks
        </h2>
        {taskList.length === 0 ? (
          <p className="text-gray-500 italic">No tasks saved yet.</p>
        ) : (
          <div className="space-y-4">
            {taskList.map((task, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl hover:shadow-lg transition duration-200 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg text-gray-800">
                    {task.Name}
                  </p>
                  {task.IsPin && (
                    <span className="text-yellow-500 text-xl">📍</span>
                  )}
                </div>
                <p className="text-gray-600">{task.Description}</p>
                {task.Tags && task.Tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.Tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-3">
                  Completed:{" "}
                  <span
                    className={
                      task.IsCompleted ? "text-green-600 font-medium" : "text-red-500 font-medium"
                    }
                  >
                    {task.IsCompleted ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
