const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('resume'); // File upload for resumes

// Get list of jobs
exports.getJobList = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.render('user/job-list', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching jobs');
    }
};

// Get job details
exports.getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).send('Job not found');
        res.render('user/job-detail', { job });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching job details');
    }
};


// Apply for a job (Handles file upload)
exports.applyForJob = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).send(`File upload failed: ${err.message}`);
        }
        try {
            const { name, email, phone } = req.body;
            const { jobId } = req.params;
            const resume = req.file ? req.file.filename : null;

            // Validate required fields
            if (!name || !email || !phone || !resume) {
                return res.status(400).send('All fields (Name, Email, Phone, Resume) are required.');
            }

            // Check if job exists
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).send('Job not found.');
            }

            // Save application
            const newApplication = new Application({
                name,
                email,
                phone,
                jobId,
                resume,
                status: 'Pending'
            });

            await newApplication.save();
            res.redirect('/user/jobs');
        } catch (error) {
            console.error('Application error:', error);
            res.status(500).send('Error applying for job.');
        }
    });
};

// View notifications
exports.getNotifications = async (req, res) => {
    try {
        const jobs = await Job.find(); // Fetch all posted jobs
        const applications = await Application.find().populate('jobId'); // Populate job details

        let notifications = [];

        // Add job posting notifications
        jobs.forEach(job => {
            notifications.push({ message: `New job posted: ${job.title} at ${job.company}` });
        });

        // Add application status notifications
        applications.forEach(application => {
            if (application.jobId) { // Ensure job exists
                notifications.push({ 
                    message: `Your application for ${application.jobId.title} at ${application.jobId.company} was ${application.status}` 
                });
            }
        });

        res.render('user/notifications', { notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).send('Error loading notifications.');
    }
};



exports.getApplyJobPage = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).send('Job not found');
        
        res.render('user/apply-job', { job });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading apply job page');
    }
};
// Get user applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('jobId'); // Populate job details
        res.render('user/applications', { applications });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).send('Error loading applications.');
    }
};


// Get user dashboard
exports.getDashboard = async (req, res) => {
    try {
        const jobs = await Job.find().limit(5); // Fetch latest jobs
        res.render('user/dashboard', { jobs });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).send('Error loading dashboard');
    }
};


 

