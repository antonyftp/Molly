const { RichEmbed } = require("discord.js");
const { getMember, formatDate } = require("../../functions.js");


module.exports = {
    name: "playerinfo",
    aliases: ["userinfo", "user", "who", "whois"],
    category: "info",
    description: "Retourne les infos du joueur ayant executer la commande",
    usage: "!playerinfo @username",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join("\n") || "none";

        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setDescription(`Info <@${member.user.id}>`)
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField('Nom', member.displayName, true)
            .addField('Tag discord', member.user.tag, true)
            .addField('ID', member.user.id, true)
            .addField('Date de création', created, true)
            .addField("Date d'arrivée", joined, true)
            .addField('Roles', roles, true)

            .setTimestamp();

        message.channel.send(embed);
    }
};