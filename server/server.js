const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); 
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();

// Connect to the database
connectDB();
require('./cronJobs');
// Middleware
app.use(cors()); 
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
