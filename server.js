const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
  origin: '*' // Allow all origins during development
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/top-stories', async (req, res) => {
    try {
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching top stories' });
    }
});

app.get('/api/item/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${req.params.id}.json`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching item details' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
