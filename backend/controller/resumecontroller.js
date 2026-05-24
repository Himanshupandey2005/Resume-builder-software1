const { createResume, getResumesByUser, getResumeById, deleteResume } = require('../models/resumemodel'); // model import

// naya resume banana
const create = (req, res) => {
    const { title } = req.body; // frontend se title aaya
    const user_id = req.user.id; // middleware se user id mili

    createResume(user_id, title, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(201).json({ message: 'Resume created', resumeId: result.insertId });
    });
};

// saare resumes lana
const getAll = (req, res) => {
    const user_id = req.user.id; // middleware se user id mili

    getResumesByUser(user_id, (err, resumes) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(200).json(resumes);
    });
};

// ek resume lana
const getOne = (req, res) => {
    const id = req.params.id; // URL se id aaya

    getResumeById(id, (err, resume) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        res.status(200).json(resume);
    });
};

// resume delete karna
const remove = (req, res) => {
    const id = req.params.id; // URL se id aaya

    deleteResume(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(200).json({ message: 'Resume deleted' });
    });
};

module.exports = { create, getAll, getOne, remove }; // export