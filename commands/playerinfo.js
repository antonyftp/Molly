const Discord = require("discord.js");
const { getMember, formatDate } = require("./utils/playerinfo.utils");
const mollydb = require("../js/mollydb");

exports.run = (bot, message, args) => {
    const member = getMember(message, args.join(" "));
    const joined = formatDate(member.joinedAt);
    const roles = member.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r).join("\n") || "none";
    const created = formatDate(member.user.createdAt);
    let date = null;
    mollydb.query(`SELECT lastConnected as lastDate FROM discord.members where discordID = ${message.member.id}`, function (err, result) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Info ${member.user.username}`)
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField('Nom', member.displayName, true)
            .addField('Tag discord', member.user.tag, true)
            .addField('ID', member.user.id, true)
            .addField('Date de création', created, true)
            .addField("Date d'arrivée", joined, true)
            .addField("Dernière connexion", result[0].lastDate, true)
            .addField('Roles', roles, true)

            .setTimestamp();
        message.channel.send(embed);
    });
}
