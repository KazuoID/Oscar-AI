const express = require('express');
const app = express();
const { server_port } = require('./data');
const port = server_port || 80 || 8080;

app.get('/', (req, res) => {
    res.send('Oscar AI is alive!');
    res.attachment('./index.js')
});

app.listen(port, () => {
    console.log(`The web server is running on port ${port}!`);
});

module.exports = { app };
