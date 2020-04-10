var mollydb = require("../js/mollydb");
const runban = require("../commands/utils/runtempban");
const config = require("../json/config.json")

module.exports = (client) => {
    console.log("Ready to go !");
    client.user.setPresence({
        status: "online",
        activity: {
            name: "retourner au drop pod",
            type: "PLAYING",
        }
    })
    client.guilds.cache.find(x => x.id = '461941319787610122').members.cache.forEach(member => {
        if (!member.roles.cache.has(config.discord.defaultRoles.member))
            member.roles.add(member.guild.roles.cache.find(x => x.name === "Membre")).then(r => console.log(`[Start] ${member.displayName} got his member role back`));
        if (!member.roles.cache.has(config.discord.defaultRoles.communitySpacer)) {
            member.roles.add(member.guild.roles.cache.find(x => x.name === "==== Grade communautaire ====")).then(r => console.log(`[Start] ${member.displayName} got his community spacer role back`));
        }
        if (!member.roles.cache.has(config.discord.defaultRoles.plateformSpacer)) {
            member.roles.add(member.guild.roles.cache.find(x => x.name === "======== Plateforme ========")).then(r => console.log(`[Start] ${member.displayName} got his plateform spacer role back`));
        }
        if (!member.roles.cache.has(config.discord.defaultRoles.classSpacer)) {
            member.roles.add(member.guild.roles.cache.find(x => x.name === "========= Classes =========")).then(r => console.log(`[Start] ${member.displayName} got his classe spacer role back`));
        }
    })
    client.guilds.cache.find(x => x.id === '461941319787610122').fetchBans().then(bans => {
        bans.array().forEach(banuser => {
            mollydb.query(`SELECT COUNT(*) as total from discord.members where discordID = ${banuser.user.id} and isBan = 1 and unbanTimestamp <> 0`, function (err, result) {
                if (err) throw err;
                if (result[0].total == 1) {
                    console.log(`[START] Unban procedure restarted for ${banuser.user.username}`);
                    runban.runtempban(banuser, client);
                }
            })
        })
    })
};
