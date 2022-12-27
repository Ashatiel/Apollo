const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const transcripts = require("discord-html-transcripts");
const Database = require("../../handlers/configLoader.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Purge amount of messages.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption(options => options
        .setName("amount")
        .setDescription("Specify how many messages you want to delete")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
        )
    .addUserOption(options => options
        .setName("target")
        .setDescription("Provide the target member to only delete their messages.")
    ),
    async execute(interaction, client) {
        const Amount = interaction.options.getNumber("amount");
        const Target = interaction.options.getUser("target");

        const channelMessages = await interaction.channel.messages.fetch();
        const logChannel = interaction.guild.channels.cache.get("1050328998082785280")

        const responseEmbed = new EmbedBuilder().setColor("DarkNavy");
        const logEmbed = new EmbedBuilder().setColor("DarkAqua")
        .setAuthor({name: "CLEAR COMMMAND INITIATED"});

        let logEmbedDescription = [
            `• Moderator: ${interaction.member}`,
            `• Target: ${Target || "None"}`,
            `• Channel: ${interaction.channel}`,
        ];

        if(Target) {
            let i = 0;
            let messagesToDelete = [];
            channelMessages.filter((message) => {
              if (message.author.id === Target.id && Amount > i) {
                messagesToDelete.push(message);
                i++ 
              }  
            });

            const Transcript = await transcripts.generateFromMessages(messagesToDelete, interaction.channel);
            interaction.channel.bulkDelete(messagesToDelete, true).then((messages) => {
                interaction.reply({embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages from ${Target}`)],
                ephemeral: true
            });

            logEmbedDescription.push(`• Total Messages: ${messages.size}`)
            logChannel.send({
                embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))],
                files: [Transcript]
            });
            
        });

        } else {
            const Transcript = await transcripts.createTranscript(interaction.channel, { limit: Amount });
            interaction.channel.bulkDelete(Amount, true).then((messages) => {
                interaction.reply({
                    embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages.`)],
                    ephemeral: true
                });

                logEmbedDescription.push(`• Total Messages: ${messages.size}`);
                logChannel.send({
                    embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))],
                    files: [Transcript]
                });
            });

        }
    }
}
