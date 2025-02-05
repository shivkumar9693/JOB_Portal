// // const mongoose = require('mongoose');

// // const jobSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true
// //   },
// //   address: String,
// //   image: String,
// //   salary: Number,
// //   cgpa: Number,
// //   deadline: {
// //     type: Date,
// //     default: new Date('2099-12-31')
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   },
// //   jobType: {
// //     type: String,
// //     default: 'fulltime'
// //   },
// //   appliedUsers: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'user'
// //     }
// //   ],
// //   questions: [
// //     {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'question'
// //     }
// //   ]
// // });

// // const Job = mongoose.model('job', jobSchema);
// // module.exports = Job;
// const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: String,
//   image: String,
//   salary: Number,
//   cgpa: Number,
//   deadline: { type: Date, default: new Date('2099-12-31') },
//   createdAt: { type: Date, default: Date.now },
//   jobType: { type: String, default: 'fulltime' },
//   appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], // Correct population
//   questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }]
// });

// const Job = mongoose.model('job', jobSchema);
// module.exports = Job;
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name: String,
    address: String,
    companyName: String,
    companyLocation: String,
    jobType: String,
    cgpa: Number,
    salary: Number,
    deadline: Date,
    appliedUsers: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            resume: { type: String },
            appliedAt: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Job', jobSchema);
