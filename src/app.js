const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const app = express();

dotenv.config({
    path: path.join(__dirname, '.env')
});

const port = process.env.PORT || 3000;

process.chdir(path.join(__dirname, '../src'));
const publicDirectory = path.join(__dirname, 'public');
app.use(express.static(publicDirectory));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('combined'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routing/getRouting'));
app.use('/', require('./routing/postRouting'));

app.use((req, res, next) => {
    res.status(404).sendFile("404.html", {
        root: publicDirectory
    });
});

app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});