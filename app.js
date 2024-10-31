
const express = require('express');
const session = require('express-session');
const path = require('path'); 
const app = express();

app.use(express.urlencoded({ extended: true })); 

app.use(session({
    secret: '54cfeb5ad7143e87b3279d8b4c1ff0d291ba706058a763154682c3a3733dc1d59a63e3cca9fb3d0b5d3e4b221cb8c1c349f46e5afed190b97fb8973aece0f37a',  // Use a secret key for sessions
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the 'views' directory or root directory
app.use(express.static(path.join(__dirname, 'views')));

// Serve the form on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjust path if your HTML file is in a different directory
});

// POST route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, phone, address } = req.body;

    // Server-side validation
    if (name.length < 3) {
        return res.send("Name must be at least 3 characters long.");
    }
    if (!email.includes("@") || !email.includes(".")) {
        return res.send("Please enter a valid email address.");
    }
    if (phone.length < 10 || isNaN(phone)) {
        return res.send("Please enter a valid 10-digit phone number.");
    }

    // If validation passes, respond with success message
    res.send("Data submitted successfully !");
    print(name,email,phone,address)
});

// Start the server
app.listen(3003, () => {
    console.log("Server is running at http://localhost:3003");
});
