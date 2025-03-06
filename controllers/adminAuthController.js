const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin'); // Ensure you have an Admin model

// Admin Signup Controller
exports.signupAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({ name, email, password: hashedPassword });
        await newAdmin.save();

        // Generate JWT token
        const token = jwt.sign({ id: newAdmin._id }, "your_secret_key", { expiresIn: "1h" });

        // Send response with redirect URL
        res.status(201).json({ message: 'Signup successful!', token, redirect: '/admin/dashboard' });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ adminId: admin._id }, 'your_secret_key', { expiresIn: '1h' });

        // Send response with token
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

