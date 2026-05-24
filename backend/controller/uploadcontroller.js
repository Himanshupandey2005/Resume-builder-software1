const multer = require('multer'); // file upload ke liye
const path = require('path'); // file path ke liye

// file kahan save hogi aur naam kya hoga
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // uploads folder mein save karo
    },
    filename: (req, file, cb) => {
        // unique naam — timestamp + original naam
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// sirf images allow karo
const fileFilter = (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Sirf image files allowed hain!'), false);
    }
};

const upload = multer({ storage, fileFilter });

// photo upload karo
const uploadPhoto = (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'File nahi mili!' });
    res.status(200).json({ 
        message: 'Photo uploaded!',
        photoUrl: `/uploads/${req.file.filename}` 
    });
};

module.exports = { upload, uploadPhoto };