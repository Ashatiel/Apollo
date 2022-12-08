const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans the member provided.')
    .addUserOption(option => option.setName('target').setDescription('The user you\'d like to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The reason for banning the user provided.')),
    async execute(interaction, client) {
    
        const user = interaction.options.getUser('target');
        let reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id).cache(console.error);

        if (!reason) return reason = "No reason provided.";
        
        await member.ban({
            deleteMessageDays: 1,
            reason: reason,
        }).catch(console.error);

        await interaction.reply({
            content: `${user.tag} has been banned.`
        });
    },
};