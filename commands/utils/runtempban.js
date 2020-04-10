const mollydb = require("../../js/mollydb");

module.exports = {
    runtempban(tbUser, client) {
        let time = Date.now();
        mollydb.query(`SELECT unbanTimestamp as unbanTmstp FROM sys.members where discordID = ${tbUser.user.id}`, function (err, result) {
            if (err) throw err;
            while (time < result[0].unbanTmstp) {
                time = Date.now();
            }
            mollydb.query(`UPDATE sys.members SET isBan = 0, unbanTimestamp = null, modWhoBan = null where discordID = ${tbUser.user.id}`, function (err) {
                if (err) throw err;
                client.guilds.cache.find(x => x.id === '688713802333552672').members.unban(tbUser.user.id).then(r => console.log(`${tbUser.user.username} has been unbanned from the discord`));
            });
        });
    }
};
