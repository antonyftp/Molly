const mollydb = require("../../js/mollydb");

module.exports = {
    function (tbUser, message) {
        let time = Date.now();
        mollydb.query(`SELECT unbanTimestamp as unbanTmstp FROM sys.members where discordID = ${tbUser.id}`, function (err, result) {
            if (err) throw err;
            console.log(`Time now : ${time} --- Time unban : ${result[0].unbanTmstp}`);
            while (time < result[0].unbanTmstp) {
                time = Date.now();
            }
            mollydb.query(`UPDATE sys.members SET isBan = 0, unbanTimestamp = null, modWhoBan = null where discordID = ${tbUser.id}`, function (err) {
                if (err) throw err;
                message.guild.members.unban(tbUser).then(r => console.log(`${tbUser.displayName} has been unbanned from the discord`));
            });
        });
    }
};
