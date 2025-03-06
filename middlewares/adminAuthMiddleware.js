const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Check if cookies exist
    if (!req.cookies || !req.cookies.adminToken) {
        return res.redirect('/admin/adminlogin'); // Redirect if no token is found
    }

    try {
        const decoded = jwt.verify(req.cookies.adminToken, process.env.JWT_SECRET);
        req.admin = decoded; // Store admin details in req
        next();
    } catch (err) {
        return res.redirect('/admin/adminlogin'); // Redirect if token is invalid
    }
};
