// utils/upload.js
const multer = require("multer");
const path = require("path");

// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to allow only specific formats
const fileFilter = (req, file, cb) => {
    const imageTypes = /jpeg|jpg|png|gif|webp|heic|heif/;
    const videoTypes = /mp4|mkv|mov|m4v/;
    const pdfTypes = /pdf/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (
        file.fieldname === "image" &&
        imageTypes.test(extname) &&
        imageTypes.test(mimetype)
    ) {
        cb(null, true);
    } else if (
        file.fieldname === "video" &&
        videoTypes.test(extname) &&
        videoTypes.test(mimetype)
    ) {
        cb(null, true);
    } else if (
        file.fieldname === "pdf" &&
        pdfTypes.test(extname) &&
        pdfTypes.test(mimetype)
    ) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file format"), false);
    }
};

// Initialize Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

module.exports = upload;
