require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', urlRoutes);

// MongoDB Connect + Server Start
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch(err => console.error(err));
