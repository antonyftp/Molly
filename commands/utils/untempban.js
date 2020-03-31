const mollydb = require("../../js/mollydb");

module.exports = {
    untempban(tbUser) {
        let time = Date.now();
        mollydb.query(`SELECT unbanTimestamp as unbanTmstp FROM sys.members where discordID = ${tbUser.id}`, function (err, result) {
            if (err) throw err;
            while (time < result[0].unbanTmstp) {
                time = Date.now();
            }
            mollydb.query(`UPDATE sys.members SET isBan = 0, unbanTimestamp = null, modWhoBan = null where discordID = ${tbUser.id}`, function (err) {
                if (err) throw err;
                tbUser.guild.members.unban(tbUser).then(r => console.log(`${tbUser.displayName} has been unbanned from the discord`));
            });
        });
    }
};
