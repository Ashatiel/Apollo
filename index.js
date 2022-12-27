const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { config } = require('dotenv')
config();


const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

const { loadConfig } = require("./handlers/configLoader.js");
const { loadEvents } = require("./handlers/eventHandler.js");
const { loadCommands } = require("./handlers/commandHandler.js");

const client = new Client({
   intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates ],
   partials: [User, Message, GuildMember, ThreadMember],
});

client.distube = new DisTube(client, {
   emitNewSongOnly: true,
   leaveOnFinish: true,
   emitAddSongWhenCreatingQueue: false,
   plugins: [new SpotifyPlugin()]
});

module.exports = client;

client.config = require("./config.json");
client.commands = new Collection();
client.events = new Collection();
client.guildConfig = new Collection();

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(client.config.DatabaseURL, {
}).then(() => console.log("The Mongoose is now Connected."))

loadConfig(client);
loadEvents(client);
loadCommands(client)

const token = process.env.token
client.login(token);