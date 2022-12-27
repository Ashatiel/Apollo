const { loadCommands } = require("../../handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Chirp! The Cockatiel Family is flying in! Chirp!`);

    loadCommands(client)
  },
};
