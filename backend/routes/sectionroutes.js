const express = require('express'); // express import
const router = express.Router(); // router banaya
const { addSection, getSections, removeSection, addItem, getItems } = require('../controller/sectioncontroller'); // controller import
const verifyToken = require('../middlewares/authmiddleware'); // middleware import

// section routes
router.post('/', verifyToken, addSection); // naya section banao
router.get('/:resume_id', verifyToken, getSections); // resume ke sections dekho
router.delete('/:id', verifyToken, removeSection); // section delete karo

// section items routes
router.post('/item', verifyToken, addItem); // item add karo
router.get('/item/:section_id', verifyToken, getItems); // items dekho

module.exports = router; // export