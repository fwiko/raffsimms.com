const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).render('index');
});

router.get('/contact', (req, res) => {
    res.status(200).render('contact');
});

router.get('/projects', (req, res) => {
    res.status(200).render('projects');
});

module.exports = router;