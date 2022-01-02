const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fetchUrl = require('fetch').fetchUrl;

const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}

const sendResponse = (res, status, message) => {
    res.render('contact', {
        status: status,
        message: message
    })
};

const sendEmail = (name, email, subject, message) => {
    const GMAIL_USER = process.env.GMAIL_USER
    const GMAIL_PASS = process.env.GMAIL_PASS
    const RECIPIENT_EMAIL = 'raff@raffsimms.com'

    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    })

    const mailOptions = {
        from: `${name}`,
        to: RECIPIENT_EMAIL,
        subject: `${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    }

    smtpTrans.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error(err);
            return false;
        } else {
            return true;
        }
    })
}

router.post('/sendform', (req, res) => {
    const {
        nameInput,
        emailInput,
        subjectInput,
        messageInput
    } = req.body;

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return sendResponse(res, false, "Failed captcha verification");
    }

    const SECRET_KEY = process.env.SECRET_KEY;
    let ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET_KEY + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + ip;

    let validCaptcha;
    fetchUrl(verificationURL, (error, response, body) => {
        body = JSON.parse(body.toString())
        if (body.success !== undefined && !body.success) {
            validCaptcha = false;
        } else {
            validCaptcha = true;
        }
    })
    if (!validCaptcha) {
        return sendResponse(res, false, "Failed captcha verification");
    }

    if (nameInput == "" || emailInput == "" || subjectInput == "" || messageInput == "") {
        return sendResponse(res, false, "Missing field");
    }
    if (!validateEmail(emailInput)) {
        return sendResponse(res, false, "Invalid email");
    }

    sendEmail(nameInput, emailInput, subjectInput, messageInput, (response) => {
        if (response) {
            sendResponse(res, true, "Message sent");
        } else {
            sendResponse(res, false, "Failed to send message")
        }
    });

});

module.exports = router;