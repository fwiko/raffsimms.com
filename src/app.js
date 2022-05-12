// dependencies
const express = require('express');
const { engine } = require('express-handlebars');

// timestamps for console.log messages
require('console-stamp')(console, {
    format: ':date(yyyy-mm-dd HH:MM:ss o) :label'
});

// config
const config = require('./config');

// initialise express app
const app = express();

// request logging
app.use((req, res, next) => {
    const start = process.hrtime();
    res.on('finish', () => {
        const diff = process.hrtime(start)
        console.log(`${req.ip} - "${req.method} ${req.originalUrl}" ${res.statusCode} ${res._contentLength || "-"} ${((diff[0] * 1e9 + diff[1]) / 1e6).toFixed(3)} ms`);
    });
    next();
});

// public file serving
app.use(express.static('public'));

// template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// routing
app.use('/', require('./routes'));
app.use((req, res, next) => {
    res.sendStatus(404);
});

// server start
app.set('trust proxy', config.server.proxied);
app.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
});