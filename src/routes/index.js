// dependencies
const router = require('express').Router();

// config
const config = require('../config');

// home page
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Raff Simms',
        ...config.frontend,
        age: new Date(new Date() - new Date("August 12 2003")).getFullYear() - 1970,
        year: new Date().getFullYear()
    })
});

module.exports = router;