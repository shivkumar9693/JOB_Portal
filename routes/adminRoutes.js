const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuthController = require('../controllers/adminAuthController'); 
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware'); // Import middleware

// Admin Authentication Routes
router.get('/signup', (req, res) => res.render('admin/signup'));
router.post('/signup', adminAuthController.signupAdmin);
router.get('/adminlogin', (req, res) => res.render('admin/adminlogin'));
router.post('/adminlogin', adminAuthController.loginAdmin);

// Protected Admin Dashboard (Requires Authentication)
router.get('/dashboard', adminAuthMiddleware, adminController.getDashboard);

// Protected Job Posting Routes
router.get('/post-job', adminAuthMiddleware, adminController.getPostJob);
router.post('/post-job', adminAuthMiddleware, adminController.postJob);

// View Jobs & Applicants (Protected)
router.get('/job-list', adminAuthMiddleware, adminController.getJobList);
router.get('/applicant-list', adminAuthMiddleware, adminController.getApplicantList);
router.get('/applicants/:jobId', adminAuthMiddleware, adminController.getApplicants);

// Job Management (Protected)
router.get('/jobs/edit/:jobId', adminAuthMiddleware, adminController.getEditJobPage);
router.post('/jobs/edit/:jobId', adminAuthMiddleware, adminController.updateJob);
router.get('/jobs/delete/:jobId', adminAuthMiddleware, adminController.deleteJob);

// Application Status (Protected)
router.post('/accept-application/:applicationId', adminAuthMiddleware, adminController.acceptApplication);
router.post('/reject-application/:applicationId', adminAuthMiddleware, adminController.rejectApplication);

router.get('/logout', (req, res) => {
    res.clearCookie('adminToken'); // Clear token cookie
    res.redirect('/admin/adminlogin'); // Redirect to login
});

module.exports = router;
