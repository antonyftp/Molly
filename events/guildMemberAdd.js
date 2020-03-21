const mollydb = require("../js/mollydb");

module.exports = (client, member) => {
    mollydb.query(`SELECT COUNT(discordID) as total from sys.members where discordID = '${member.id}'`, function (err, result) {
        if (err) throw err;
        console.log(result[0].total);
        if (result[0].total === 0) {
            mollydb.query(`INSERT INTO sys.members (discordTag, discordID) VALUES ('${member.displayName}', '${member.id}')`, function (err, result) {
                if (err) throw err;
                console.log(`${member.displayName} registered in database`);
            })
        }
    })
};
