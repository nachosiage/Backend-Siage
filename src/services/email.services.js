import nodemailer from 'nodemailer';
import config from '../config.js';

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.gmail.userGmail,
                pass: config.gmail.passGmail
            }
        })
    }

    sendEmail(to, subject, html, attachments = []) {
        return this.transporter.sendMail({
            from: config.gmail.userGmail,
            to,
            subject,
            html, 
            attachments
        })
    }
};

export default new EmailService();