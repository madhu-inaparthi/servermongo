const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = 8000;

app.use(express.json());

const connectionString = 'mongodb+srv://madhukiraninaparthi2001:madhu%402025@cluster0.qhqdf.mongodb.net/myDatabase';
mongoose.connect(connectionString)
.then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.error('Failed to connect', err);
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// POST endpoint to create a user
app.post('/user', async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const newUser = new User({ name, email, age, password });
        const savedUser = await newUser.save();
        res.status(200).json({ message: "User saved successfully", data: savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// GET endpoint to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all user records
        res.status(200).json({ message: "Users retrieved successfully", data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
