const fs = require('fs');
const path = require('path');
const router = require('express').Router();

function fetchData(type, _callback) {
    
    let fileName;
    switch (type) {
        case "projects":
            fileName = "projects";
            break
        default:
            break
    }
    if (fileName != null || filename != undefined) {
        return _callback(JSON.parse(fs.readFileSync(path.join(__dirname, `../data/${fileName}.json`))));
    }
    _callback(null);
}

router.get('/', (req, res) => {
    res.status(200).render('index');
});

router.get('/contact', (req, res) => {
    res.status(200).render('contact');
});

router.get('/projects', (req, res) => {
    fetchData("projects", (data) => {
        if (!data.projects) {
            return res.send("Error loading projects. Contact the creator of this site if this issue persists.");
        }
        res.status(200).render('projects', {
            "projects": data.projects
        });
    })

});


module.exports = router;
