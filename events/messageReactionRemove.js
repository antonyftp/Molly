const config = require("../json/config.json")

module.exports = (bot, reaction, user) => {
    let roleNumber = 0;
    for (roleNumber = 0; reaction.emoji.name !== config.discord.roleReact.emoji[roleNumber]; roleNumber++);

    const role = user.client.guilds.cache.find(x => x.id === config.discord.id).roles.cache.find(x => x.name ===config.discord.roleReact.ranks[roleNumber])
    user.client.guilds.cache.find(x => x.id === config.discord.id).members.cache.find(x => x.id === user.id).roles.remove(role).then(r => console.log(`${user.username} removed his role ${role.name} !`));
}
