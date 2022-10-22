const chalk = require('chalk');

const { log } = console;

class DatabaseService {
  save(email, price, timestamp) {
    log(chalk.rgb(103, 180, 130)(`\nRunning query: \nINSERT INTO orders VALUES (email, price, created)\nVALUES (${chalk.redBright(email)}, ${chalk.redBright(price)}, ${chalk.redBright(timestamp)})`));
  }
}

module.exports = DatabaseService;
