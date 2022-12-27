const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("Emit the guildMemberAdd/Remove events.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
    developer: true,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        client.emit("guildMemberAdd", interaction.member);
        client.emit("guildMemberRemove", interaction.member);

        interaction.reply({content: "Emitted GuildMemberAdd/GuildMemberRemove", ephemeral: true});
    }
}