const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/usermodel');

const register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (user) return res.status(400).json({ message: 'Email already exists' });

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Server error" });

            createUser(name, email, hashedPassword, (err, result) => {
                if (err) return res.status(500).json({ message: "Server error" });

                return res.status(201).json({
                    message: "User registered successfully"
                });
            });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error' });
        if (!user) return res.status(400).json({ message: 'User not found' });

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ message: "JWT secret missing" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            return res.status(200).json({
                message: 'Login successful',
                token
            });
        });
    });
};

module.exports = { register, login };