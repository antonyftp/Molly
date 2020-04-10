const mollydb = require("../js/mollydb");
const config = require("../json/config");

module.exports = (client, member) => {
    mollydb.query(`SELECT COUNT(discordID) as total from discord.members where discordID = '${member.id}'`, function (err, result) {
        if (err) throw err;
        if (result[0].total === 0) {
            const username = member.displayName.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '').replace(`'`, '').replace('`', '').replace('"', '');
            mollydb.query(`INSERT INTO discord.members (discordTag, discordID) VALUES ('${username}', '${member.id}')`, function (err, result) {
                if (err) throw err;
                console.log(`${member.displayName} registered in database`);
                client.channels.cache.find(x => x.id === config.discord.welcomeChannelID).send(`Hello <@${member.id}> 👋\n\nBienvenue dans la communauté discord francophone du jeu Deep Rock Galactic ! Avant d'aller t'amuser avec tes nouveaux confrères nains, nous t'invitons à lire les channels <#580824056702697498> et <#580825741021806602> afin de ne pas être perdu sur le discord et à t'attribuer tes rôles dans le channel <#462222791022739456>.\n\nRock & Stone et bon jeu à toi ⛏`);
                member.roles.add(member.guild.roles.cache.find(x => x.name === "Membre"));
                member.roles.add(member.guild.roles.cache.find(x => x.name === "==== Grade communautaire ===="))
                member.roles.add(member.guild.roles.cache.find(x => x.name === "======== Plateforme ========"))
                member.roles.add(member.guild.roles.cache.find(x => x.name === "========= Classes ========="))
            });
        };
    });
};
