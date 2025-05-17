const userModel = require("../models/user");

exports.getMyTasks = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json({ tasks: user.tasks });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.markTaskDone = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).send("User not found");
    const idx = req.body.index;
    if (typeof idx !== 'number' && typeof idx !== 'string') return res.status(400).send("Invalid index");
    user.tasks.splice(idx, 1);
    await user.save();
    res.send("Task marked as done");
  } catch {
    res.status(500).send("Error marking task as done");
  }
};

exports.removeTask = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).send("User not found");
    const idx = req.body.index;
    if (typeof idx !== 'number' && typeof idx !== 'string') return res.status(400).send("Invalid index");
    user.tasks.splice(idx, 1);
    await user.save();
    res.send("Task removed");
  } catch {
    res.status(500).send("Error removing task");
  }
};
