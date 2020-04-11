const Discord = require("discord.js");
const config = require("../json/config");
const mollydb = require("../js/mollydb");

exports.run = (bot, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Cette commande est reservée aux administrateurs");
    message.guild.members.cache.forEach(member => {
        mollydb.query(`SELECT COUNT(discordID) as total from discord.members where discordID = '${member.id}'`, function (err, result) {
            if (err) throw err;
            if (result[0].total === 0) {
                //const username = member.displayName.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '').replace(`'`, '').replace('`', '').replace('"', '');
                const username = member.tag
                mollydb.query(`INSERT INTO discord.members (discordTag, discordID) VALUES ('${username}', '${member.id}')`, function (err) {
                    if (err) throw err;
                    console.log(`[SYNC BDD] ${member.displayName} registered in database`);
                });
            }
        });
        if (!member.roles.cache.has('689209127536164901')) {
            member.roles.add(member.guild.roles.cache.find(x => x.name === "Membre")).then(r => console.log(`[SYNC BDD] ${member.displayName} got his member role back`));
            member.roles.add(member.guild.roles.cache.find(x => x.name === "==== Grade communautaire ====")).then(r => console.log(`[SYNC BDD] ${member.displayName} got his communitySpacer role back`));
            member.roles.add(member.guild.roles.cache.find(x => x.name === "======== Plateforme ========")).then(r => console.log(`[SYNC BDD] ${member.displayName} got his platformSpacer role back`));
            member.roles.add(member.guild.roles.cache.find(x => x.name === "========= Classes =========")).then(r => console.log(`[SYNC BDD] ${member.displayName} got his classesSpacer role back`));
        }
    });
};
