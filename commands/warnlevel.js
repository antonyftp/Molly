const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./json/warning.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Permission refusée");
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.reply("Je n'ai pas trouvé l'utilisateur");
    let warnlevel = warns[wUser.id].warns;

    message.reply(`<@${wUser.id}> a ${warnlevel} warn(s)`);
};


module.exports.help = {
    name: "warnlevel"
};