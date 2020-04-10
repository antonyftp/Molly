const Discord = require("discord.js");
const { formatDate } = require("./utils/playerinfo.utils");
const config = require("../json/config.json")

exports.run = (bot, message) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`Informations du discord`)
        .setFooter(message.member.displayName, message.member.user.displayAvatarURL())
        .setColor("BLUE")

        .addField("**Nom**", bot.guilds.cache.find(x => x.id === config.discord.id).name, true)
        .addField("**Date de création**", formatDate(bot.guilds.cache.find(x => x.id === config.discord.id).createdAt), true)
        .addField("**Nombre de membres**", bot.guilds.cache.find(x => x.id === config.discord.id).memberCount, true)
        .addField("**Fondateur**", `<@${bot.guilds.cache.find(x => x.id === config.discord.id).ownerID}>`, true)

    message.channel.send(embed);
}
