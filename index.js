const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
dotenv.config();

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.color = "FFFFFF";
client.commandArray = [];

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login("MTA1MDMxMjM3Njg1NzE1MzU4Ng.Gxso-Y.0KT256UDgKJnAcx4Kbj255Ma0nRsb1latLGN-A");
(async () => {
  mongoose
    .connect("mongodb+srv://ash:root@cluster0.t3vqwgg.mongodb.net/discord")
    .catch(console.error);
})();
mongoose.set("strictQuery", true);
