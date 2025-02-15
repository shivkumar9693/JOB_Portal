const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/dashboard', UserController.getDashboard);

// Route to get the list of jobs
router.get('/jobs', UserController.getJobList);

// Route to get job details
router.get('/jobs/:jobId', UserController.getJobDetails);

// Route to get notifications
router.get('/notifications', UserController.getNotifications);

// Route to get applications
router.get('/applications', UserController.getApplications);

router.get('/apply-job/:jobId', UserController.getApplyJobPage);

// Route to apply for a job (file upload handled inside controller)
router.post('/jobs/:jobId/apply', UserController.applyForJob);

module.exports = router;
