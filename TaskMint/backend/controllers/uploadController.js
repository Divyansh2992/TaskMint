const csvParser = require("csv-parser");
const fs = require("fs");
const userModel = require("../models/user");

exports.uploadAndDistributeTasks = (req, res) => {
  const filePath = req.file.path;
  const tasks = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      const normalizedRow = {};
      Object.keys(row).forEach((key) => {
        const trimmedKey = key.trim();
        if (typeof row[key] === "string") {
          normalizedRow[trimmedKey] = row[key].trim();
        } else {
          normalizedRow[trimmedKey] = row[key];
        }
      });
      if (!normalizedRow.FirstName && !normalizedRow.Phone && !normalizedRow.Notes) {
        return;
      }
      if (!normalizedRow.FirstName || !normalizedRow.Phone || !normalizedRow.Notes) {
        return;
      }
      tasks.push(normalizedRow);
    })
    .on("end", async () => {
      const users = await userModel.find({});
      if (users.length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).send("No users found in the database to distribute tasks.");
      }
      const distributedTasks = Array.from({ length: users.length }, () => []);
      tasks.forEach((task, index) => {
        distributedTasks[index % users.length].push(task);
      });
      try {
        for (let i = 0; i < users.length; i++) {
          users[i].tasks = distributedTasks[i];
          await users[i].save();
        }
        res.status(200).send("Tasks distributed successfully among all users.");
      } catch (error) {
        res.status(500).send("Error saving tasks to the database");
      }
      fs.unlinkSync(filePath);
    })
    .on("error", (error) => {
      fs.unlinkSync(filePath);
      res.status(500).send("Error processing the file");
    });
};
