const express = require("express");
const taskContainer = require("../Controller/task");

const router = express.Router();

// Get All Task
router.get("/get-all-task", taskContainer.getAllTask);

// Create Task
router.post("/add-task", taskContainer.createTask);

// Update Task by ID
router.put("/update-task/:id", taskContainer.updateTask);

// Delete Task by Id
router.delete("/delete-task/:id", taskContainer.deleteTask);

module.exports = router;