const chalk = require('chalk');

const { log } = console;

class EmailService {
  send(email) {
    log(chalk.inverse(`Sending email to ${email}`));
  }
}

module.exports = EmailService;
