// const form = document.querySelector('#contact-form');

// const sendMail = (mail, _callback) => {
//     fetch('sendform', {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         mode: 'cors',
//         body: JSON.stringify(Object.fromEntries(mail.entries()))
//     }).then((response) => {
//         return _callback(response.json());
//     });
// }

// const formEvent = form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     sendMail(new FormData(form), (response) => {
//         console.log(response);
//     })
// })

grecaptcha.ready(function () {
    grecaptcha.execute('6LfdVt0ZAAAAAASyUX8YSa1YoXjWBFn5L22OFYrk', {
            action: 'validate_captcha'
        })
        .then(function (token) {
            document.getElementById('g-recaptcha-response').value = token;
        });
});