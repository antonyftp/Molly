const Discord = require("discord.js");
const config = require("../json/config");

exports.run = async (bot, message, args) => {

    let kUser = message.guild.member(message.mentions.users.first());
    if (!kUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");
    let kReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Permission refusée");
    if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Cette personne ne peut pas être kick !");

    if (!kReason) return message.channel.send("Tu n'a pas mentionné de raison");

    let kickEmbed = new Discord.MessageEmbed()
        .setDescription("Kick")
        .setColor("#ff750c")
        .setThumbnail(kUser.user.avatarURL())
        .addField("Utilisateur kick", `${kUser} ID : ${kUser.id}`)
        .addField("Kick par", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Date", message.createdAt)
        .addField("Raison", kReason);

    let kickchannel = bot.channels.cache.find(x => x.name === config.bot.modLogChannel);
    if (!kickchannel) return message.channel.send("Je n'ai pas pu trouver le channel de modération (adm error)");

    message.guild.member(kUser).kick(kReason);
    message.delete();

    kickchannel.send(kickEmbed);
};
