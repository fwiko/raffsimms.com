const express = require('express');
const router = express.Router();

const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}

router.post('/sendform', (req, res) => {

    const { nameInput, emailInput, subjectInput, messageInput } = req.body;
    if (nameInput == "" || emailInput == "" || subjectInput == "" || messageInput == "") {
        return;
    }
    if (!validateEmail(emailInput)) {
        return;
    }
    console.log(nameInput, emailInput, subjectInput, messageInput);

});


module.exports = router;