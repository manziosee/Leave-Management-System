const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');
const config = require('../config');

module.exports = class Email {
  constructor(user, fromUser) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.from = fromUser 
      ? `${fromUser.name} <${fromUser.email}>` 
      : `Leave Management System <${config.email.from}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid or other production email service
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: config.email.username,
          pass: config.email.password
        }
      });
    }

    return nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      auth: {
        user: config.email.username,
        pass: config.email.password
      }
    });
  }

  async send(template, subject, templateVars) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        subject,
        ...templateVars
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendLeaveRequestNotification(leave) {
    await this.send(
      'leaveRequest',
      'New Leave Request',
      {
        leaveType: leave.type,
        startDate: leave.startDate.toLocaleDateString(),
        endDate: leave.endDate.toLocaleDateString(),
        reason: leave.reason || 'No reason provided',
        url: `${process.env.FRONTEND_URL}/approvals`
      }
    );
  }

  async sendLeaveApprovalNotification(leave) {
    await this.send(
      'leaveApproved',
      'Your Leave Has Been Approved',
      {
        leaveType: leave.type,
        startDate: leave.startDate.toLocaleDateString(),
        endDate: leave.endDate.toLocaleDateString(),
        comments: leave.comments || 'No comments',
        url: `${process.env.FRONTEND_URL}/my-leaves`
      }
    );
  }

  async sendLeaveRejectionNotification(leave) {
    await this.send(
      'leaveRejected',
      'Your Leave Has Been Rejected',
      {
        leaveType: leave.type,
        startDate: leave.startDate.toLocaleDateString(),
        endDate: leave.endDate.toLocaleDateString(),
        comments: leave.comments || 'No comments provided',
        url: `${process.env.FRONTEND_URL}/my-leaves`
      }
    );
  }
};