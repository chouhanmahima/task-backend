const express = require("express");
const dotenv = require("dotenv");
const router = require("./Routes/task");
const databaseConnection = require("./Utils/database");
const scheduleTask = require("./Utils/scheduler");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(express.json())

// Main Route
app.use("/api/v1", router);

// DB Connection
databaseConnection();

// Schedule Task Call (cron)
scheduleTask();

app.listen(PORT, () => {
    console.log(`Server is Up and running at Port :- ${PORT}`);  
});