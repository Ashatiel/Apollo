const { loadCommands } = require("../../handlers/commandHandler.js")
const { loadConfig } = require("../../handlers/configLoader.js");
const { loadEvents } = require("../../handlers/eventHandler");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Chirp! The Cockatiel Family is flying in! Chirp!`);
  
     loadCommands(client)
     loadConfig(client);
     loadEvents(client);
  },
};
