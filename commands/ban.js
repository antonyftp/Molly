const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");
    let bReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Permission refusée");
    if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Cette personne ne peut pas être ban !");
    let bIcon = bUser.user.avatarURL;

    if (!bReason) return message.channel.send("Tu n'a pas mentionné de raison");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#ff1323")
    .setThumbnail(bIcon)
    .addField("Utilisateur ban", `${bUser} ID : ${bUser.id}`)
    .addField("Ban par", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Date", message.createdAt)
    .addField("Raison", bReason);

    let banchannel = message.guild.channels.find(x => x.name === "logs");
    if (!banchannel) return message.channel.send("Je n'ai pas pu trouver le channel de modération (adm error)");

    message.guild.member(bUser).ban(bReason);
    message.delete();

    banchannel.send(banEmbed);
};

module.exports.help = {
    name: "ban"
};
