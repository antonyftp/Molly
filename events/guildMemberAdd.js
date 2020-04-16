const mollydb = require("../js/mollydb");
const config = require("../json/config");

module.exports = (client, member) => {
    mollydb.query(`SELECT COUNT(discordID) as total from discord.members where discordID = '${member.id}'`, function (err, result) {
        if (err) throw err;
        if (result[0].total === 0) {
            mollydb.query(`INSERT INTO discord.members (discordID) VALUES ('${member.id}')`, function (err) {
                if (err) throw err;
                console.log(`[Join] ${member.displayName} registered in database`);
                client.channels.cache.find(x => x.id === config.discord.welcomeChannelID).send(`Hello <@${member.id}> 👋\n\nBienvenue dans la communauté discord francophone du jeu Deep Rock Galactic ! Avant d'aller t'amuser avec tes nouveaux confrères nains, nous t'invitons à lire les channels <#580824056702697498> et <#580825741021806602> afin de ne pas être perdu sur le discord et à t'attribuer tes rôles dans le channel <#462222791022739456>.\n\nRock & Stone et bon jeu à toi ⛏`);
                member.roles.add(member.guild.roles.cache.find(x => x.name === "Membre")).then(r => console.log(`[Join] ${member.displayName} got his member role`));
                member.roles.add(member.guild.roles.cache.find(x => x.name === "==== Grade communautaire ====")).then(r => console.log(`[Join] ${member.displayName} got his community spacer role`));
                member.roles.add(member.guild.roles.cache.find(x => x.name === "======== Plateforme ========")).then(r => console.log(`[Join] ${member.displayName} got his platform spacer role`));
                member.roles.add(member.guild.roles.cache.find(x => x.name === "========= Classes =========")).then(r => console.log(`[Join] ${member.displayName} got his class spacer role`));
            });
        };
    });
};
