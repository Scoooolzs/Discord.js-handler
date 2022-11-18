module.exports = async (client) => {
  client.func = {
    SlashBuilder: async (options) => {
      const { REST, Routes } = require("discord.js");
      const { promisify } = require("util");
      const { glob } = require("glob");
      const PG = promisify(glob);

      let allCmds = 0;
      let commands = [];
      let errored = [];
      let files = [];

      (await PG("./src/commands/*/*.js")).forEach((file) => {
        allCmds += 1;

        const fileData = require(file.replace("./src", ".."));
        const fileName = file.split("/");

        try {
          const command = require(file.replace("./src", ".."));

          commands.push(command.data.toJSON());
          files.push(fileData);
        } catch (err) {
          errored.push(fileName[4]);
        }
      });

      const rest = new REST({ version: "10" }).setToken(options.token);

      const data = await rest
        .put(Routes.applicationCommands(options.clientId), { body: commands })
        .catch(() => true);

      return {
        refreshed: allCmds,
        errored,
        reloaded: data,
        files,
      };
    },
  };
};
