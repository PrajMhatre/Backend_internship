const express = require("express");
const router = express.Router();
const Job = require("../Model/Jobs");
const jobData = require("../Data/JobsDataAvl");

// POST route to add new jobs from jobData
router.post("/", async (req, res) => {
    try {
        const Jobs = jobData;

        const savedJobs = [];

        for (const jobData of Jobs) {
            const newJob = new Job(jobData);
            const savedJob = await newJob.save();
            savedJobs.push(savedJob);
        }

        // Send the saved data as the response
        res.send(savedJobs);
    } catch (error) {
        console.error("Error while posting the data", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET route to retrieve all jobs
router.get("/", async (req, res) => {
    try {
        const data = await Job.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Internal server error" });
    }
});

// GET route to retrieve job by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Job.findById(id);
        if (!data) {
            res.status(404).json({ error: "Job not found" });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Internal server error" });
    }
});

module.exports = router;
