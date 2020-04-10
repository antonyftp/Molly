const Discord = require("discord.js");
const config = require("../json/config.json");
const fs = require("fs");

exports.run = (bot, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Cette commande est reservée aux administrateurs");
    const embed = new Discord.MessageEmbed()
        .setTitle("Role react")
        .setDescription("Cliquez sur un emoji en réaction pour obtenir le rôle lié à l'emoji")
        .setColor("BLUE")

        .addField("__**Plateforme :**__", 'Votre plateforme de jeu')
        .addField(config.discord.roleReact.ranks[0], config.discord.roleReact.emoji[0], true)
        .addField(config.discord.roleReact.ranks[1], config.discord.roleReact.emoji[1], true)

        .addField("__**Classe(s) principale(s) :**__", 'Votre / vos classe(s) principale(s) dans le jeu')
        .addField(config.discord.roleReact.ranks[2], config.discord.roleReact.emoji[2], true)
        .addField(config.discord.roleReact.ranks[3], config.discord.roleReact.emoji[3], true)
        .addField(config.discord.roleReact.ranks[4], config.discord.roleReact.emoji[4], true)
        .addField(config.discord.roleReact.ranks[5], config.discord.roleReact.emoji[5], true)

        .addField("__**Autres rôles :**__", 'Les différents rôles dispo sur le discord')
        .addField(config.discord.roleReact.ranks[6], config.discord.roleReact.emoji[6], true)
        .addField(config.discord.roleReact.ranks[7], config.discord.roleReact.emoji[7], true)

    message.delete();
    message.channel.send(embed).then(rolemessage => {
        config.discord.roleReact.emoji.forEach(emoji => rolemessage.react(emoji))
        console.log(`Role react message ID : ${rolemessage.id}`)
    })
}
