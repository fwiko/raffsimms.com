const form = document.querySelector('#contact-form');

const sendMail = (mail) => {
    fetch('sendform', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        mode: 'cors',
        body: JSON.stringify(Object.fromEntries(mail.entries()))
    }).then((response) => {
        return response.json();
    });
}

const formEvent = form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMail(new FormData(form))
})