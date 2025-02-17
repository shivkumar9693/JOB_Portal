const Job = require('../models/Job');
const Application = require('../models/Application');

// Admin Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.render('admin/dashboard', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Render Post Job Page
exports.getPostJob = (req, res) => {
    res.render('admin/post-job');
};

// Handle Posting a Job
exports.postJob = async (req, res) => {
    try {
        const { title, company, role, skills, salary } = req.body;
        const newJob = new Job({ title, company, role, skills: skills.split(','), salary });
        await newJob.save();
        res.redirect('/admin/job-list');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error posting job');
    }
};

// View All Jobs
exports.getJobList = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.render('admin/job-list', { jobs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching jobs');
    }
};

// View All Applicants for a Job
exports.getApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await Application.find({ jobId });
        res.render('admin/applicant-list', { applications });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching applicants');
    }
};

// View All Applicants (All Jobs)
exports.getApplicantList = async (req, res) => {
    try {
        const applications = await Application.find().populate('jobId'); // Get job details too
        res.render('admin/applicant-list', { applications: applications.length > 0 ? applications : [] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching applicants');
    }
};

// Accept an Application
exports.acceptApplication = async (req, res) => {
    try {
        await Application.findByIdAndUpdate(req.params.applicationId, { status: 'Accepted' });
        res.redirect(`/admin/applicants/${req.body.jobId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error accepting application');
    }
};

// Reject an Application
exports.rejectApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        await Application.findByIdAndUpdate(applicationId, { status: 'Rejected' });
        res.redirect('/admin/applicant-list');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error rejecting application');
    }
};
exports.getEditJobPage = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId); // Fetch job from DB

        if (!job) {
            return res.status(404).send('Job not found');
        }

        res.render('admin/edit-job', { job });
    } catch (error) {
        console.error('Error loading edit job page:', error);
        res.status(500).send('Internal Server Error');
    }
};


// Update job logic
exports.updateJob = async (req, res) => {
    try {
        const { title, company, role, skills, salary } = req.body;
        await Job.findByIdAndUpdate(req.params.jobId, { title, company, role, skills: skills.split(','), salary });

        res.redirect('/admin/jobs');
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).send('Error updating job');
    }
};

// Controller to handle job deletion
exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).send('Job not found');
        }

        console.log(`Job deleted: ${deletedJob.title}`);
        res.redirect('/admin/dashboard'); // Redirect to admin dashboard after deletion
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).send('Internal Server Error');
    }
};
