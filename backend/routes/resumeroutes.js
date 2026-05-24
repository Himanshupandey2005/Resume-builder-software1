const express = require('express'); // express import
const router = express.Router(); // router banaya
const { create, getAll, getOne, remove } = require('../controller/resumecontroller'); // controller import
const verifyToken = require('../middlewares/authmiddleware'); // middleware import

// saare routes protected hain - verifyToken pehle chalega
router.post('/', verifyToken, create); // naya resume banao
router.get('/', verifyToken, getAll); // saare resumes dekho
router.get('/:id', verifyToken, getOne); // ek resume dekho
router.delete('/:id', verifyToken, remove); // resume delete karo

module.exports = router; // export