const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const databaseConnection = () => {
    mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("DB Connection Successfully");
    })
    .catch((error) => {
        console.log("DB Connection ERROR: ", error);    
    });
};

module.exports = databaseConnection;