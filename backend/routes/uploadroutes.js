const express = require('express'); // express import
const router = express.Router(); // router banaya
const { upload, uploadPhoto } = require('../controller/uploadcontroller'); // controller import
const verifyToken = require('../middlewares/authmiddleware'); // middleware import

// photo upload route
router.post('/', verifyToken, upload.single('photo'), uploadPhoto);

module.exports = router; // exportb