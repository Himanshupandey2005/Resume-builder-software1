const express = require('express'); // express import
const router = express.Router(); // router banaya
const { register, login } = require('../controller/authcontroller'); // controller import

// register route
router.post('/register', register);

// login route
router.post('/login', login);

module.exports = router; // export kiya