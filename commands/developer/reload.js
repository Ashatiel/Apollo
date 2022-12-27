const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client } = require("discord.js");

const { loadCommands } = require("../../handlers/commandHandler.js")
const loadEvents = require("../../handlers/eventHandler.js")

    module.exports = {
        developer: true,
        data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads the commands/events of the bot.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((options) => options
        .setName("events")
        .setDescription("Reload the events of the bot."))
        .addSubcommand((options) => options
        .setName("commands")
        .setDescription("Reload the commands of the bot.")),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         * @param {Client} client 
         */
        execute(interaction, client) {
            const subCommand = interaction.options.getSubcommand();
            
            switch(subCommand) {
                case "events" : {
                    for( const [key, value] of client.events )
                    client.removeListener(`${key}`, value, true)
                    loadEvents(client);
                    interaction.reply({comtent: "Reloaded Events", ephemeral: true});
                }
                break;
                case "commands" : {
                    loadCommands(client);
                    interaction.reply({content: "Reloaded Comands.", ephemeral: true});
                }
                break;
            }
        }
    }