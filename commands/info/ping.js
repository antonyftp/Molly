module.exports = {
    name: "ping",
    category: "info",
    description: "Retourne la latence de l'API",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Pinging...`);

        await msg.edit(`Pong ! La latence du serveur est de ${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms et la latence de l'API est de ${Math.round(client.ping)} ms`);
    }
};