const express = require('express');
const { fetchSupply } = require('./supplyFetcher');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/supply', async (req, res) => {
    try {
        const currentSupply = await fetchSupply();
        res.json({ tot_supply: currentSupply });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
