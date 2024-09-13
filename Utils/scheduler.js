const cron = require("node-cron");
const dotenv = require("dotenv");

const TaskModel = require("../Models/task");
const sendEmail = require("./sendEmail");

dotenv.config();

// const scheduleTask = () => {


//     // Schedule to run every minute
//     cron.schedule("* * * * *", async () => {
//         console.log("Running Scheduled Task...");

//         try {
//             // Fetch all tasks that are incomplete
//             const tasks = await TaskModel.find({isCompleted : false});
//             // console.log("Tasks fetched:", tasks);

//             tasks.forEach(async (task) => {
//                 // Sending email if the task date matches (YYYY-MM-DD)
//                 const currentDate = new Date().toISOString().split("T")[0];


//                 if(task.taskDate === currentDate){
//                     try {
//                         await sendEmail(
//                             process.env.MAIL_RECEIVE,
//                             `Reminder: ${task.taskName}`,
//                             `Task: ${task.taskDescription}`,
//                         );
//                         console.log(`Email sent successfully for task: ${task.taskName}`);
//                     } catch (error) {
//                         console.error(`Failed to send email for task: ${task.taskName}`, error.message);
//                     }
//                 }

//             });

//         } catch (error) {
//             console.error("Error fetching tasks or sending emails:", error.message);
//         }

//     });

//     // sendEmail(process.env.MAIL_RECEIVE, "Reminder : Task", "Description : hello");
// };

// module.exports = scheduleTask;

const scheduleTask = () => {
    // Schedule to run at 10pm (22)

    cron.schedule("0 22 * * *", async () => {
        console.log("Running Scheduled Task...");

        try {
            // Fetch all tasks that are incomplete
            const tasks = await TaskModel.find({ isCompleted: false });
            console.log("Tasks fetched:", tasks.length);  // Log number of tasks fetched

            tasks.forEach(async (task) => {
                const currentDate = new Date().toISOString().split("T")[0];
                console.log("Task Date:", task.taskDate, "Current Date:", currentDate);  // Log task date

                if (task.taskDate === currentDate) {
                    console.log(`Sending email for task: ${task.taskName}`);  // Log email intent

                    // Try sending email and log success/failure
                    // try {
                        await sendEmail(
                            process.env.MAIL_RECEIVE,
                            `Reminder: ${task.taskName}`,
                            `Task: ${task.taskDescription}`
                        );
                        console.log(`Email sent successfully for task: ${task.taskName}`);
                    // } catch (error) {
                    //     console.error(`Failed to send email for task: ${task.taskName}`, error.message);
                    // }
                }
            });

        } catch (error) {
            console.error("Error fetching tasks or sending emails:", error.message);
        }

    });
    // sendEmail(
    //     process.env.MAIL_RECEIVE,
    //     `Reminder: this is email`,
    //     `Task: email done`
    // );
    // console.log(`Email sent successfully for task: `);
};

module.exports = scheduleTask;