const TaskModel = require("../Models/task");


// Get All Task 
const getAllTask = async(req, res) => {
    try {
        
        // Fetch all Task Data
        const taskData = await TaskModel.find();

        res.status(200).json({
            success : true,
            message : "Fetch Task List Successfully",
            data : taskData,
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went Wrong ! Try Again Later !",
            error : error.message,
        });
    }
};

// Create a New Task
const createTask = async(req, res) => {
    try {
        
        // Extract task data from the request body
        const {taskName, taskDescription, taskDate } = req.body;
        // console.log(taskName, taskDescription, taskDate);

        // Create a new task instance
        const newTask = new TaskModel({
            taskName,
            taskDescription,
            taskDate,
        });

        // Save the new task to the database
        const saveTask = await newTask.save();

        res.status(201).json({
            success : true,
            message : "Task Created Successfully.",
            task : saveTask,
        });
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went Wrong ! Try Again Later !",
            error : error.message,
        });
    }  
};

// Update Task By ID
const updateTask = async(req, res) => {
    try {

        // Get request from user
        const taskId = req.params.id;
        const updateData = req.body;
        // console.log(taskId, updateData);

        // Find and Update a Task
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateData, {new : true});

        // Condition for Task Not found
        if(!updatedTask){
            return res.status(404).json({
                success : false,
                message : "Task not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Task Updated Successfully.",
            task : updatedTask,
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went Wrong ! Try Again Later !",
            error : error.message,
        });
    }
}

// Delete Task by ID
const deleteTask = async(req, res) => {
    try {

        // Get request from user
        const taskId = req.params.id;
        // console.log(taskId);

        // Find and Delete the Task
        const deleteTask = await TaskModel.findByIdAndDelete(taskId);

        // Condition for Task Not found
        if(!deleteTask){
            return res.status(404).json({
                success : false,
                message : "Task not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Task Deleted Successfully.",
            task : deleteTask,
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went Wrong ! Try Again Later !",
            error : error.message,
        });
    }
}

const taskContainer = {
    getAllTask,
    createTask,
    updateTask,
    deleteTask,
};

module.exports = taskContainer;