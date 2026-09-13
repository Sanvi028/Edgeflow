import express from 'express'

const app = express();

const PORT = 8000;
const ORIGIN_URL = 'http://localhost:7000';

const cache = new Map();

app.get('/data', async (req, res) => {

    const cacheKey = '/data';

    // Cache HIT
    if (cache.has(cacheKey)) {

        console.log('Cache HIT');

        const cachedData = cache.get(cacheKey);

        return res.json(cachedData);
    }

    // Cache MISS
    console.log('Cache MISS');

    try {

        const response = await fetch(`${ORIGIN_URL}/data`);

        const data = await response.json();

        // Store response in cache
        cache.set(cacheKey, data);

        console.log('Data fetched from Origin and cached');

        res.json(data);

    } catch (error) {

        console.error('Origin request failed');

        res.status(500).json({
            error: 'Origin Server unavailable'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Edge server running on port ${PORT}`);
});