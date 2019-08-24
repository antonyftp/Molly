const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let iUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!iUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");

    let roles = iUser.roles.array();

    let icon = iUser.user.avatarURL;
    let infoEmbed = new Discord.RichEmbed()
    .setDescription(`Liste des commandes de modération`)
    .setColor("#0110F0")
    .setThumbnail(icon)
    .addField("Kick", "!kick @user raison")
    .addField("Ban", "!ban @user raison")
    .addField("Clear", "!clear nbmessages");

    message.channel.send(infoEmbed);
};

module.exports.help = {
    name: "modh"
};
