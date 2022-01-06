const fs = require('fs');
const path = require('path');
const router = require('express').Router();

function fetchData(type) {
    
    let fileName;
    switch (type) {
        case "projects":
            fileName = "projects";
            break
        default:
            break
    }
    if (fileName != null || filename != undefined) {
        return JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${fileName}.json`)));
    }
}

router.get('/', (req, res) => {
    res.status(200).render('index');
});

router.get('/contact', (req, res) => {
    res.status(200).render('contact');
});

router.get('/projects', (req, res) => {
    res.status(200).render('projects', {
        "projects": fetchData("projects").projects
    });
});


module.exports = router;
