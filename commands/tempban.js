const Discord = require("discord.js");
const config = require("../json/config");
const mollydb = require("../js/mollydb");
const unban = require("./utils/untempban");

exports.run = async (bot, message, args) => {
    // Find user to ban //
    let tbUser = message.guild.member(message.mentions.users.first());
    if (!tbUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");

    // Find time to ban //
    let words = message.content.split(" ");
    let timeban = words[words.length - 1];
    let timebanint = parseInt(timeban);

    // Find reason //
    let tbReason = message.content.slice(1).trim().split(`"`)[1].replace('g', '');

    // Error management //
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Permission refusée");
    if (tbUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Cette personne ne peut pas être ban !");
    if (!tbReason) return message.channel.send("Tu n'a pas mentionné de raison");

    let tbanEmbed = new Discord.MessageEmbed()
        .setDescription("TempBan")
        .setColor("#ff1323")
        .setThumbnail(tbUser.user.avatarURL())
        .addField("Utilisateur TempBan", `${tbUser} ID : ${tbUser.id}`)
        .addField("TempBan par", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Durée du ban", `${timeban} jours`)
        .addField("Channel", message.channel)
        .addField("Date", message.createdAt)
        .addField("Raison", tbReason);

    let tbanchannel = bot.channels.cache.find(x => x.id === config.discord.modlogChannelID);
    if (!tbanchannel) return message.channel.send("Je n'ai pas pu trouver le channel de modération (adm error)");

    await mollydb.query(`UPDATE sys.members SET isBAN = 1, unbanTimestamp = ${Date.now() + (timebanint * 86400000)}, modWhoban = '${message.author.tag}' where discordID = ${tbUser.id}`, function (err, result) {
        if (err) throw err;
    });
    message.guild.member(tbUser).ban({reason: tbReason}).then(() => {
        console.log(`${tbUser.displayName} has been tempbanned from the discord for a duration of ${timeban} days !`);
    });

    message.delete();
    await tbanchannel.send(tbanEmbed);

    unban.function(tbUser, message);
};
