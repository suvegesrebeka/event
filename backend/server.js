// Importing the required libraries
const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 3000;
const { Sequelize } = require('sequelize');
const cors = require('cors'); // Import the cors middleware
const { getAllEventTypes } = require('./getEventTypes');

app.use(cors());
// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'eventapp',
  database: 'eventapp'
});

// Connecting to MySQL server
connection.connect((err) => {
  if (err) {
    console.error('ERROR connecting to MySQL server: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL server as id ' + connection.threadId);
});

// ORM
const sequelize = new Sequelize('eventapp', 'root', 'eventapp', {
  host: 'localhost',
  dialect: 'mysql' // vagy az adott adatbázis típusa
});

// Test the ORM connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('ORM works.');
  } catch (error) {
    console.error('ERROR while connecting to the ORM:', error);
  }
}

// Call the function to retrieve all event types
testConnection();

// Set up the route for handling requests to /getEventTypes
app.get('/getEventTypes', async (req, res) => {
  try {
    const eventTypes = await getAllEventTypes();
    // console.log(res.json(eventTypes))
    res.json(eventTypes); // Send the event types as a JSON response
  } catch (error) {
    console.error('Error handling GET request for event types:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
