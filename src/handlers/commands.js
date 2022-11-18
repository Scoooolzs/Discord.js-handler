const chalk = require("chalk");

module.exports = async (client) => {
  console.log(chalk.cyanBright("| ") + chalk.blueBright(" Slash Commands"));

  const data = await client.func.SlashBuilder(client.config.botInfo);
  client.login(client.config.botInfo.token);

  data.files.forEach((command) => {
    client.commands.set(command.data.name, command);
  });

  const dataLength = {
    refreshed: data.refreshed,
    errored: data.errored.length,
    reloaded: data.reloaded.length,
  };

  console.log(chalk.cyanBright("| "));
  console.log(
    chalk.cyanBright("| ") +
      chalk.yellow(" Commands Fetched ") +
      chalk.bgYellow(dataLength.refreshed + " Commands.")
  );
  console.log(
    chalk.cyanBright("| ") +
      chalk.green("Succeeded to load ") +
      chalk.bgGreen(dataLength.reloaded + " Commands.")
  );
  if (dataLength.errored === 0) {
    console.log(
      chalk.cyanBright("| ") +
        chalk.red("  Cannot load the ") +
        chalk.bgRed(dataLength.errored + " Commands.")
    );
  } else {
    console.log(
      chalk.cyanBright("| ") +
        chalk.red("  Cannot load the ") +
        chalk.bgRed(dataLength.errored + " Commands.") +
        chalk.red(" diantaranya:")
    );

    data.errored.forEach((name) => {
      console.log(chalk.cyanBright("| ") + chalk.red(`- ${name}`));
    });
  }

  console.log(chalk.cyanBright("|------------------------------"));
};

//  Commands Fetched
// Succeeded to load
//   Cannot load the
