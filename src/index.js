require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds })
client.commands = new Collection();
client.color = "FFFFFF";
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`) (client)
}

client.handleEvents();
client.handleCommands();
client.login(`MTA1MDMxMjM3Njg1NzE1MzU4Ng.GbJVNM.f8nh9tPPAHDmTdcvKHlnx2UVOgUrbibzc1P6jk`);