const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin Dashboard
router.get('/dashboard', adminController.getDashboard);

// Post a New Job
router.get('/post-job', adminController.getPostJob);
router.post('/post-job', adminController.postJob);

// View All Jobs
router.get('/job-list', adminController.getJobList);

// View All Applicants
router.get('/applicant-list', adminController.getApplicantList);


// View Applicants for a Job
router.get('/applicants/:jobId', adminController.getApplicants);

// Accept or Reject an Application
router.post('/accept-application/:applicationId', adminController.acceptApplication);
router.post('/reject-application/:applicationId', adminController.rejectApplication);
module.exports = router;
