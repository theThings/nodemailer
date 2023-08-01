'use strict';

const sgMail = require('@sendgrid/mail');
const shared = require('nodemailer-shared');
const EventEmitter = require('events').EventEmitter;


module.exports = function (options) {
    return new SendgridTransport(options);
};

/**
 * Creates a SendGrid transport object for Nodemailer
 *
 * @constructor
 * @param {Object} options Connection options
 */
function SendgridTransport(options) {
    EventEmitter.call(this);

    this.options = options || {};

    this.name = 'sendgrid';
    this.version = '1.0.0';
    
    this.logger = shared.getLogger(this.options);
}

/**
 * Sends an e-mail using the selected settings
 *
 * @param {Object} mail Mail object
 * @param {Function} callback Callback function
 */
SendgridTransport.prototype.send = function (mail, callback) {
  const data = {
    to: mail.to,
    from: mail.from,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(data, (err, info) => {
    if (err) {
      return callback(err);
    }
    return callback(null, info);
  });
}