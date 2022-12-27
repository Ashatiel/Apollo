const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the Ping of the Bot."),
  async execute(interaction) {
    interaction.reply({content: "Pong!", ephemeral: true});
  },
};
