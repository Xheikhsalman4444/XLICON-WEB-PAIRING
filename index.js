const express = require('express');
const path = require('path'); // Import the path module
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;
let code = require('./pair');

// Increase the max listeners for events
require('events').EventEmitter.defaultMaxListeners = 500;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Use the code middleware
app.use('/code', code);

// Serve pair.html file when visiting /pair
app.use('/pair', async (req, res) => {
  res.sendFile(path.join(__dirname, 'pair.html')); // Properly construct the path
});

// Serve main.html file when visiting /
app.use('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
