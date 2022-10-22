const chalk = require('chalk');
const TicketManager = require('./ticketManager');
const EmailService = require('./emailService');
const DatabaseService = require('./databaseService');

const { log } = console;
const ticketManager = new TicketManager(3);
const emailService = new EmailService();
const databaseService = new DatabaseService();

function underline(string) {
  return chalk.underline(string);
}
function colorize(string, fontcolor) {
  return log(chalk[fontcolor](string));
}

function bgColorize(string, fontcolor) {
  return log(chalk[fontcolor](`${string}`));
}

ticketManager.on('buy', (email, price, timestamp) => {
  emailService.send(email);
  databaseService.save(email, price, timestamp);
});

ticketManager.on('error', (error) => {
  console.error(chalk.bgRed(`Gracefully handling our error: ${error}`));
});

colorize(`\nWe have ${ticketManager.listenerCount('buy')} listener(s) for the ${underline('buy')} event`, 'blue');

colorize(`We have ${ticketManager.listenerCount('error')} listener(s) for the ${underline('error')} event\n`, 'red');

const onBuy = () => {
  colorize('\nI will be removed soon\n', 'yellow');
};

ticketManager.on('buy', onBuy);

colorize(`We added a new event listener bringing our \ntotal count for the ${chalk.yellowBright.underline('buy')} event to: ${chalk.yellowBright(ticketManager.listenerCount('buy'))}\n`, 'gray');

ticketManager.buy('test@email', 20);
ticketManager.off('buy', onBuy);

colorize(`We now have: ${ticketManager.listenerCount('buy')} listener(s) for the buy event\n`, 'blue');

ticketManager.buy('test@email', 20);
ticketManager.removeAllListeners('buy');

colorize(`\nWe have ${ticketManager.listenerCount('buy')} listeners for the buy event\n`, 'blue');

ticketManager.buy('test@email', 20);

bgColorize('The last ticket was bought', 'bgGreen');
