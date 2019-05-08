const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");
    let kReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Permission refusée");
    if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Cette personne ne peut pas être kick !");
    let kIcon = kUser.user.avatarURL;

    if (!kReason) return message.channel.send("Tu n'a pas mentionné de raison");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#ff750c")
    .setThumbnail(kIcon)
    .addField("Utilisateur kick", `${kUser} ID : ${kUser.id}`)
    .addField("Kick par", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Date", message.createdAt)
    .addField("Raison", kReason);

    let kickchannel = message.guild.channels.find(x => x.name === "modération");
    if (!kickchannel) return message.channel.send("Je n'ai pas pu trouver le channel de modération (adm error)");

    message.guild.member(kUser).kick(kReason);
    message.delete();

    kickchannel.send(kickEmbed);
};

module.exports.help = {
    name: "kick"
};
