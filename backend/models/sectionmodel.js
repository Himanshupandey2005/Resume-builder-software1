const db = require('../config/db'); // db import

// naya section banana
const createSection = (resume_id, section_type, section_title, callback) => {
    const sql = 'INSERT INTO sections (resume_id, section_type, section_title) VALUES (?, ?, ?)';
    db.query(sql, [resume_id, section_type, section_title], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// resume ke saare sections lana
const getSectionsByResume = (resume_id, callback) => {
    const sql = 'SELECT * FROM sections WHERE resume_id = ?';
    db.query(sql, [resume_id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// section delete karna
const deleteSection = (id, callback) => {
    const sql = 'DELETE FROM sections WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// section item add karna
const addSectionItem = (section_id, field_key, field_value, callback) => {
    const sql = 'INSERT INTO section_items (section_id, field_key, field_value) VALUES (?, ?, ?)';
    db.query(sql, [section_id, field_key, field_value], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// section ke saare items lana
const getItemsBySection = (section_id, callback) => {
    const sql = 'SELECT * FROM section_items WHERE section_id = ?';
    db.query(sql, [section_id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

module.exports = { createSection, getSectionsByResume, deleteSection, addSectionItem, getItemsBySection };