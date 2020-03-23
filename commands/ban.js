const Discord = require("discord.js");

exports.run = (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");
    let bReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Permission refusée");
    if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Cette personne ne peut pas être ban !");

    if (!bReason) return message.channel.send("Tu n'a pas mentionné de raison");

    let banEmbed = new Discord.MessageEmbed()
        .setDescription("Ban")
        .setColor("#ff1323")
        .setThumbnail(bUser.user.avatarURL())
        .addField("Utilisateur ban", `${bUser} ID : ${bUser.id}`)
        .addField("Ban par", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Date", message.createdAt)
        .addField("Raison", bReason);

    let banchannel = bot.channels.cache.find(x => x.name === "mod-logs");
    if (!banchannel) return message.channel.send("Je n'ai pas pu trouver le channel de modération (adm error)");

    message.guild.member(bUser).ban({reason: bReason}).then(r => function () {
        console.log(`${bUser.displayName} succesfully banned !`);
    });
    message.delete();

    banchannel.send(banEmbed);
}
