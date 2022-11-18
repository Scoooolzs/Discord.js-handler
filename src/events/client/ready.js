const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(
      chalk.cyanBright("| ") +
        chalk.greenBright("Client ") +
        chalk.blue(">") +
        chalk.greenBright(" Logged in as ") +
        chalk.yellowBright(client.user.tag)
    );
    console.log(chalk.cyanBright("|------------------------------"));
  },
};
