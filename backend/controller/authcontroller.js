const bcrypt=require('bcryptjs');//pass has karne ke liye use hota hai
const jwt=require('jsonwebtoken');//token banane ke liye 
const {findUserByEmail,createUser}=require('../models/usermodel');
//const { resourceLimits } = require('node:worker_threads');
const register =(req,res)=>{
    const {name,email,password}=req.body;//frontend se data lena 

    //check karo user pahe se hai kya 
    findUserByEmail(email,(err,user)=>{
        if (err) return res.status(500).json({ message: 'Server error' });
        if (user) return res.status(400).json({ message: 'Email already exists' });

        bcrypt.hash(password,10,(err,hashedPassword)=>{
            if(err) return res.status(400).json({
                message:"server error"
            });
            //db me save karo new user ko
            createUser(name,email,hashedPassword,(err,result)=>{
                if(err) return res.status(500).json({
                    message:"server error"
                });
           
                res.status(201).json({
                   message:"user registerd successfully"
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

module.exports={register,login};