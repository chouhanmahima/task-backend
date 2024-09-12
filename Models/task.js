const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName : {
        type : String,
        required : true,
    },
    taskDescription : {
        type : String,
        required : true,
    },
    taskDate : {
        type : String,
        required : true,
    },
    isCompleted : {
        type : Boolean,
        default : false,
    },
});

const TaskModel = mongoose.model("TaskLog", taskSchema);

module.exports = TaskModel;