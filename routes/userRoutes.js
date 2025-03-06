const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const userAuthController = require('../controllers/userAuthController');

// Render User Signup Page
router.get('/signup', (req, res) => {
    res.render('user/signup');
});

// Handle User Signup
router.post('/signup', userAuthController.signupUser);

router.get('/userlogin', (req, res) => {
    res.render('user/userlogin');
});

router.post('/userlogin', userAuthController.loginUser);

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
