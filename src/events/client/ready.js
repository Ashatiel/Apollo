module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Chirp! The Cockatiel Family is flying in! Chirp!`);
    }
}