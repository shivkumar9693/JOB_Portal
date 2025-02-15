const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    skills: { type: [String], required: true },
    salary: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Job', jobSchema);
