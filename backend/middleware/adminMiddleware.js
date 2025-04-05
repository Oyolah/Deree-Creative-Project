const { verify } = require("jsonwebtoken");
const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Not authorized" });

        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (user?.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { adminMiddleware };
