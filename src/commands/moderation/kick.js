const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you'd like to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the user provided.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .cache(console.error);

    if (!reason) reason = "No reason provided.";

    await member.kick(reason).catch(console.error);

    await interaction.reply({
      content: `${user.tag} has been kicked.`,
    });
  },
};
