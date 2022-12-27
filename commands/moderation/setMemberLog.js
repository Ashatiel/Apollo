const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require("discord.js")
const Database = require("../../schemas/MemberLog.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure the member logging system for your guild.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) => options
        .setName("log_channel")
        .setDescription("Select the logging channel for this system.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
        )
    .addRoleOption((options) => options
    .setName("member_role")
    .setDescription("Set the role to be automatically added to any new members.")
    )
    .addRoleOption((options) => options
    .setName("bot_role")
    .setDescription("Set the role to be automatically added to any new bots.")
    ),
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const logChannel = options.getChannel("log_channel").id;

        let memberRole = options.getRole("member_role") ?
        options.getRole("member_role").id : null;

        let botRole = options.getRole("bot_role") ?
        options.getRole("bot_role").id : null;
    
        await Database.findOneAndUpdate(
            {Guild: guild.id},
            {
                logChannel: logChannel,
                memberRole: memberRole,
                botRole: botRole
            },
            {new: true, upsert: true}
        );

            client.guildConfig.set(guild.id, {
                logChannel: logChannel,
                memberRole: memberRole,
                botRole: botRole
            });

            const Embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription([
                `- Logging Channel Updated: <#${logChannel}>`,
                `- Member Auto-Role Updated: ${memberRole ? `<@&${memberRole}>` : "Not Specified"}`,
                `- Bot Role Updated: ${botRole ? `<@&${botRole}>` : "Not Specified"}`
            ].join("\n"))

            return interaction.reply({embeds: [Embed]});
    }
}