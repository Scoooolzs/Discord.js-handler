const chalk = require("chalk");

console.clear();
console.log(chalk.cyanBright("|------------------------------"));
console.log(chalk.cyanBright("| ") + chalk.cyan("ZeeCo Bot"));
console.log(chalk.cyanBright("| "));
console.log(chalk.cyanBright("| ") + chalk.yellow("Starting Bot..."));
console.log(chalk.cyanBright("|------------------------------"));

const { Client, Collection } = require("discord.js");
const client = new Client({
  intents: 131071,
});
require("./src/function/functions.js")(client);

client.config = config = require("./config.js");
client.commands = new Collection();

["commands", "events"].forEach((file) => {
  require(`./src/handlers/${file}.js`)(client);
});
