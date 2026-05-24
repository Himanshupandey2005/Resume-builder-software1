const db = require('../config/db'); // db import

// naya resume banana
const createResume = (user_id, title, callback) => {
    const sql = 'INSERT INTO resumes (user_id, title) VALUES (?, ?)';
    db.query(sql, [user_id, title], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// user ke saare resumes lana
const getResumesByUser = (user_id, callback) => {
    const sql = 'SELECT * FROM resumes WHERE user_id = ?';
    db.query(sql, [user_id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

// ek resume lana id se
const getResumeById = (id, callback) => {
    const sql = 'SELECT * FROM resumes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]);
    });
};

// resume delete karna
const deleteResume = (id, callback) => {
    const sql = 'DELETE FROM resumes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

module.exports = { createResume, getResumesByUser, getResumeById, deleteResume };