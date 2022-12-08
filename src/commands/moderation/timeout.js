const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeouts the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you'd like to timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for timing out the user provided.")
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The amount of time you're timing out a user for.")
    ),
  async execute(interaction, client) {
    const target_user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    let time = interaction.options.getInteger("time");

    const member = await interaction.guild.members
      .fetch(target_user.id)
      .cache(console.error);

    if (!reason) return (reason = "No reason provided.");
    if (!time) return (time = null);

    await member
      .timeout(time == null ? null : time * 60 * 1000, reason)
      .catch(console.error);

    await interaction.reply({
      content: `${user.tag} has been timed out for ${time}.`,
    });
  },
};
