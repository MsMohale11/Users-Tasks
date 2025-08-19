import task from "../Model/todo.js";

export const createTask = async (req, res) => {
  try {
    const { Name, Description, Tags, IsPin, IsCompleted } = req.body;
    const newTask = new task({
      UserId: req.UserId,
      Name,
      Description,
      Tags,
      IsPin,
      IsCompleted,
    });
    await newTask.save();
    res.status(201).json({ message: "Task Created", newTask });
  } catch (error) {
    return res.status(400).json({ message: "Error occuring", error });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await task.find({ UserId: req.params.userId });
    res.status(200).json({ message: "Tasks got", tasks });
  } catch (error) {
    res.status(400).json({ message: "Error in fetching task!", error });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await task.findById(id);

    if (!find) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    res.status(200).json({ message: "Task Found", find });
  } catch (error) {
    console.error("Error in Fetching Task", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const allow = ["Name", "Description", "Tags", "IsPin", "IsCompleted"];
    const validUpdate = Object.keys(update).some((field) =>
      allow.includes(field)
    );
    if (!validUpdate) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    const updated = await task.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    res.status(200).json({ message: "Task Updated", updated });
  } catch (err) {
    console.error("Error updating task", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

     res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
