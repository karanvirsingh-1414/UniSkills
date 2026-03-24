// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware (taki backend frontend se data receive kar sake)
app.use(cors());
app.use(express.json());

// Ek basic testing route (API)
app.get('/', (req, res) => {
    res.json({ message: "Welcome to UniSkills API. Server is running perfectly!" });
});

// Port define karo (Aam taur par backend 5000 par chalta hai)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
