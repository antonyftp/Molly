var mollydb = require("../js/mollydb");
const runban = require("../commands/utils/runtempban");

module.exports = (client) => {
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
    client.guilds.cache.find(x => x.id === '688713802333552672').fetchBans().then(bans => {
        bans.array().forEach(banuser => {
            mollydb.query(`SELECT COUNT(*) as total from sys.members where discordID = ${banuser.user.id} and isBan = 1 and unbanTimestamp <> 0`, function (err, result) {
                if (err) throw err;
                if (result[0].total == 1) {
                    console.log(`[START] Unban procedure restarted for ${banuser.user.username}`);
                    runban.function(banuser, client);
                }
            })
        })
    })
};
