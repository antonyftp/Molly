const Discord = require("discord.js");
const config = require("../json/config");
const mollydb = require("../js/mollydb");

exports.run = (bot, message, args) => {
    let ubUser = message.guild.member(message.mentions.users.first());
    if (!ubUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Permission refusée");
    if (!message.guild.fetchBan(ubUser)) return message.channel.send("Cette personne n'est pas ban !");

    let unbanEmbed = new Discord.MessageEmbed()
        .setDescription("Unban")
        .setColor("#00FF00")
        .setThumbnail(ubUser.user.avatarURL())
        .addField("Utilisateur unban", `${ubUser} ID : ${ubUser.id}`)
        .addField("Unban par", `<@${message.author.id}> ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Date", message.createdAt);

    let unbanchannel = bot.channels.cache.find(x => x.id === config.discord.modlogChannelID);
    if (!unbanchannel) return message.channel.send("Je n'ai pas pu trouver le channel de modération (adm error)");

    mollydb.query(`UPDATE discord.members SET isBan = 0, unbanTimestamp = null, modWhoBan = null where discordID = ${ubUser.id}`, function (err) {
        if (err) throw err;
        message.guild.members.unban(ubUser).then(r => console.log(`${ubUser.displayName} has been unbanned from the discord`));
    });

    message.delete();

    unbanchannel.send(unbanEmbed);
};
