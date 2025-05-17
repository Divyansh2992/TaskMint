const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const taskController = require("../controllers/taskController");

// Get logged-in user's tasks
router.get("/my-tasks", authenticateToken, taskController.getMyTasks);
// Mark a task as done
router.post("/mark-task-done", authenticateToken, taskController.markTaskDone);
// Remove a task
router.post("/remove-task", authenticateToken, taskController.removeTask);

module.exports = router;
