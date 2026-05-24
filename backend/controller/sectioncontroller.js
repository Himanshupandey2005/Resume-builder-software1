const { createSection, getSectionsByResume, deleteSection, addSectionItem, getItemsBySection } = require('../models/sectionmodel'); // model import

// naya section banana
const addSection = (req, res) => {
    const { resume_id, section_type, section_title } = req.body; // frontend se data

    createSection(resume_id, section_type, section_title, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(201).json({ message: 'Section added', sectionId: result.insertId });
    });
};

// resume ke saare sections lana
const getSections = (req, res) => {
    const resume_id = req.params.resume_id; // URL se resume_id aaya

    getSectionsByResume(resume_id, (err, sections) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(200).json(sections);
    });
};

// section delete karna
const removeSection = (req, res) => {
    const id = req.params.id; // URL se section id aaya

    deleteSection(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(200).json({ message: 'Section deleted' });
    });
};

// section mein item add karna
const addItem = (req, res) => {
    const { section_id, field_key, field_value } = req.body; // frontend se data

    addSectionItem(section_id, field_key, field_value, (err, result) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(201).json({ message: 'Item added', itemId: result.insertId });
    });
};

// section ke items lana
const getItems = (req, res) => {
    const section_id = req.params.section_id; // URL se section_id aaya

    getItemsBySection(section_id, (err, items) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        res.status(200).json(items);
    });
};

module.exports = { addSection, getSections, removeSection, addItem, getItems };