const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const api = require('./server/routes/api');

// ===== Parsers =====

app.use(bodyParser.json());

// no nested objects
app.use(bodyParser.urlencoded({extended: false}));

// serve angular files
app.use(express.static(path.join(__dirname, 'dist/meanApp')));

app.use('/api', api);

// sending all non-api routes to the dist/index.html file which where angular app exists
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/meanApp/index.html'))
});

// ===================

// set port for the server
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Running on localhost:${port}`)
});
