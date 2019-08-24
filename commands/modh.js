const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let infoEmbed = new Discord.RichEmbed()
    .setDescription(`Liste des commandes de modération`)
    .setColor("#0110F0")
    .addField("Kick", "!kick @user raison")
    .addField("Ban", "!ban @user raison")
    .addField("Clear", "!clear nbmessages");

    message.channel.send(infoEmbed);
};

module.exports.help = {
    name: "modh"
};
