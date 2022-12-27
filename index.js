const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { config } = require('dotenv')
config();

const { loadConfig } = require("./handlers/configLoader.js");
const loadEvents = require("./handlers/eventHandler.js");

const client = new Client({
   intents: [Guilds, GuildMembers, GuildMessages ],
   partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.commands = new Collection();
client.events = new Collection();
client.guildConfig = new Collection();

const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
mongoose.connect(client.config.DatabaseURL, {
}).then(() => console.log("The Mongoose is now Connected."))

loadConfig(client);
loadEvents(client);

const token = process.env.token
client.login(token);