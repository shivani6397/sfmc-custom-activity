const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/execute', async (req, res) => {
    const inArgs = req.body.inArguments[0];
    console.log("Activity Triggered for Subscriber:", inArgs.email);

    // Replace this URL with your unique URL from Webhook.site
    const WEBHOOK_URL = 'https://webhook.site/c57d15f0-574c-4b20-a6bd-6040ff6af083';

    try {
        await axios.post(WEBHOOK_URL, {
            event: "SFMC_Journey_Activity",
            subscriberEmail: inArgs.email,
            messageFromJourney: inArgs.message,
            timestamp: new Date().toISOString()
        });
        res.status(200).send({ status: 'ok' });
    } catch (err) {
        console.error("Error sending to Webhook:", err.message);
        res.status(500).send({ status: 'error' });
    }
});

app.post(['/save', '/publish', '/validate', '/stop'], (req, res) => {
    res.status(200).send('ok');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
