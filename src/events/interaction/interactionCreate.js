const { Colors } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const cmdName = interaction.commandName;
      const command = client.commands.get(cmdName);

      if (!command)
        return (
          (await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription("This command is deleted by the developer."),
            ],
            ephemeral: true,
          })) && client.command.delete(cmdName)
        );

      if (!command.execute)
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Red)
              .setDescription("This command is no data to execute."),
          ],
          ephemeral: true,
        });

      command.execute(interaction, client);
    } else if (interaction.isAutoComplete()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
