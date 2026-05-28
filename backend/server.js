const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');

const authRoutes = require('./routes/authroutes');
const resumeRoutes = require('./routes/resumeroutes');
const sectionRoutes = require('./routes/sectionroutes');
const uploadRoutes = require('./routes/uploadroutes');

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/upload', uploadRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Resume builder API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});