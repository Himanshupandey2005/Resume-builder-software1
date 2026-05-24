const express=require('express');
const cors=require('cors');
require('dotenv').config();

const db=require('./config/db');
const authRoutes = require('./routes/authroutes');
const resumeRoutes = require('./routes/resumeroutes');
const sectionRoutes = require('./routes/sectionroutes');
const uploadRoutes = require('./routes/uploadroutes'); // naya

const app=express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // photos serve karo

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/upload', uploadRoutes); // naya

app.get('/',(req,res)=>{
    res.send('resume builder api is running');
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});