const express = require("express");
const dotenv = require("dotenv");
const router = require("./Routes/task");
const databaseConnection = require("./Utils/database");
const scheduleTask = require("./Utils/scheduler");
const cors = require("cors");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow all origins, or specify a list of allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Main Route
app.use("/api/v1", router);

// DB Connection
databaseConnection();

// Schedule Task Call (cron)
scheduleTask();

app.listen(PORT, () => {
    console.log(`Server is Up and running at Port :- ${PORT}`);  
});