var mollydb = require("../js/mollydb");

module.exports = (client, guild) => {
    console.log("Ready to go !");
    client.user.setPresence({
        status: "online",
        activity: {
            name: "retourner au drop pod",
            type: "PLAYING",
        }
    })
    client.guilds.cache.find(x => x.id = '688713802333552672').members.cache.forEach(member => {
        if (!member.roles.cache.has('689209127536164901')) {
            member.roles.add(member.guild.roles.cache.find(x => x.name === "Membre")).then(r => console.log(`[Start] ${member.displayName} got his member role back`));
        }
    })
};
