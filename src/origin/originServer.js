import express from 'express';

const app = express();

const PORT = 7000;

app.get('/data', (req, res) => {

    res.json({
        message: 'Hello from Origin Server',
        timestamp: Date.now()
    });

});

app.listen(PORT, () => {
    console.log(`Origin server running on port ${PORT}`);
});