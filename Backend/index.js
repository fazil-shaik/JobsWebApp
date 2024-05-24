// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const port = 5000;

app.use(cors())

const myapiKey = process.env.API_KEY
// Define a route to fetch data from the API
app.get('/api/jobs', async (req, res) => {
  try {
    const response = await axios.get(`${myapiKey}` + req.query.searchTerm);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
