'use strict';

const htmlToText = require('html-to-text');
const nodemailer = require('nodemailer');

const localTransport = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 1025,
    ignoreTLS: true
});

function sendEmail (options, callback) {
    const email = Object.assign({
        from: 'test@localhost',
        to: 'test@localhost',
    }, options);

    // TODO Step 2: Generate plaintext alternative from HTML
    // This should take no more than a few lines
    
    const html = email.html
    email.text = htmlToText.fromString(html)

    return localTransport.sendMail(email, (err, info) => {
        if (err) {
            return callback(err);
        }

        return callback(null, {
            email,
            info
        });
    });
}

function respondToEmail (email, callback) {
    // TODO: implement as part of Step 5
    const text = email.text;
    if (text.includes("cancel")) {
        const cancelTemplate = require('./assets/templates/canceled');
        return sendEmail({
            html: cancelTemplate(),
            subject: 'Task Cancelled by Pushbot'
        }, callback);
   }    
}

module.exports = {
    sendEmail,
    respondToEmail
};
