const configDatabase = require("../schemas/MemberLog.js");
const { loadCommands } = require("./commandHandler.js");

async function loadConfig(client) {
	(await configDatabase.find()).forEach((doc) => {
    	client.guildConfig.set(doc.Guild, {
        logChannel: doc.logChannel,
        memberRole: doc.memberRole,
        botRole: doc.botRole
        });
    });
    
    loadCommands(client)
    return console.log("Loaded Guild Configs to the Collection.")
}

module.exports = { loadConfig }