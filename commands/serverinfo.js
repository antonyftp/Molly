const Discord = require("discord.js");

module.exports.run = async (bot, message) => {

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Information du server")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Date de création", message.guild.createdAt)
    .addField("Votre date d'arrivée sur le discord", message.member.joinedAt)
    .addField("Nombre de membres", message.guild.memberCount);

    message.channel.send(serverembed);
};

module.exports.help = {
    name: "serverinfo"
};
