let nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async (receiverMail, subject = 'RFP Notification', body = 'RFP Added Successfully.') => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false // for some restricted environments
        }
    });

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: receiverMail,
        subject: subject,
        text: body
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendMail;
