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

