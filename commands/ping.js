//const Discord = require("discord.js");

module.exports.run = async (bot, message) => {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong ! La latence est de ${m.createdTimestamp - message.createdTimestamp}ms. La latende de l'api est de ${Math.round(bot.ping)}ms`);
};

module.exports.help = {
    name: "ping"
};
