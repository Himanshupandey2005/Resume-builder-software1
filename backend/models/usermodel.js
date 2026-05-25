const db = require('../config/db');

const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) {
            console.log("DB ERROR (SELECT):", err);
            return callback(err, null);
        }

        callback(null, results[0]);
    });
};

const createUser = (name, email, password, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    db.query(sql, [name, email, password], (err, results) => {
        if (err) {
            console.log("DB ERROR (INSERT):", err);  // 🔥 IMPORTANT
            return callback(err, null);
        }

        callback(null, results);
    });
};

module.exports = { findUserByEmail, createUser };