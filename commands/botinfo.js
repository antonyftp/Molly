const Discord = require("discord.js");

module.exports.run = async (bot, message) => {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Information du bot")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Nom du bot", bot.user.username)
    .addField("Créateur", "Trakix (Avec amour pour la meilleure communauté DRG ❤)")
    .addField("Date de création", bot.user.createdAt);

    message.channel.send(botembed);
};

module.exports.help = {
    name: "botinfo"
};
