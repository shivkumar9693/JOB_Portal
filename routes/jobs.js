let express = require('express'),
	jobController = require('../controllers/jobs');
let router = express.Router();
// model
let Job = require('../models/job-DB.js'),
	Notification = require('../models/notif-DB');
// middlewares, destructuring
let { isLoggedIn, isAdmin } = require('../middlewares/index');

router.get('/', jobController.showLandingPage);
// index
router.get('/jobs', jobController.jobIndex);
// new
router.get('/jobs/new', isLoggedIn, isAdmin, jobController.newJobForm);
// create
router.post('/jobs', isLoggedIn, isAdmin, jobController.createJob);
// show
router.get('/jobs/:id', jobController.showJob);
// edit
router.get('/jobs/:id/edit', isLoggedIn, isAdmin, jobController.editJobForm);
// update
router.patch('/jobs/:id', isLoggedIn, isAdmin, jobController.updateJob);
// delete
router.delete('/jobs/:id', isLoggedIn, isAdmin, jobController.deleteJob);
// apply in jobs
router.get('/jobs/:jobId/apply', isLoggedIn, jobController.applyJob);

module.exports = router;
 
// let express = require('express'),
// jobController = require('../controllers/jobs'); // Ensure this path is correct

// let router = express.Router();
// let { isLoggedIn, isAdmin } = require('../middlewares/index');

// // Ensure all jobController methods exist and are correctly imported
// if (!jobController.showLandingPage || 
// !jobController.jobIndex || 
// !jobController.newJobForm || 
// !jobController.createJob || 
// !jobController.showJob || 
// !jobController.editJobForm || 
// !jobController.updateJob || 
// !jobController.deleteJob || 
// !jobController.applyJob) {
// throw new Error("One or more jobController methods are undefined. Check the import path.");
// }

// // ROUTES
// router.get('/', jobController.showLandingPage);
// router.get('/jobs', jobController.jobIndex);
// router.get('/jobs/new', isLoggedIn, isAdmin, jobController.newJobForm);
// router.post('/jobs', isLoggedIn, isAdmin, jobController.createJob);
// router.get('/jobs/:id', jobController.showJob);
// router.get('/jobs/:id/edit', isLoggedIn, isAdmin, jobController.editJobForm);
// router.patch('/jobs/:id', isLoggedIn, isAdmin, jobController.updateJob);
// router.delete('/jobs/:id', isLoggedIn, isAdmin, jobController.deleteJob);
// router.post('/jobs/:jobId/apply', isLoggedIn, jobController.applyJob); 

// module.exports = router;

