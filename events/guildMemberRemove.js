const mollydb = require("../js/mollydb");

module.exports = (client, member) => {
    mollydb.query(`SELECT isBan from sys.members where discordID = ${member.id}`, function (err, result) {
        if (err) throw err;
        if (result[0].isBan === 0) {
            mollydb.query(`DELETE FROM sys.members where discordID = '${member.id}'`, function (err) {
                if (err) throw err;
                console.log(`${member.displayName} removed from database`);
            })
        }
    });
};
