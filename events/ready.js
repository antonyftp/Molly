var mollydb = require("../js/mollydb");

module.exports = (client) => {
    console.log("Ready to go !");

    /*mollydb.query(`SELECT COUNT(discordID) as total from sys.members where discordID = '1959136741986140'`, function (err, result) {
        if (err) throw err;
        console.log(result[0].total);
    })*/
};
