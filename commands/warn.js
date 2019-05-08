const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./json/warning.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Permission refusée");
    let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!wUser) return message.reply("Je n'ai pas trouvé l'utilisateur");
    if (wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Permission refusée");
    let reason = args.join(" ").slice(22);

    if (!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./json/warning.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
        .setDescription("Warns")
        .setAuthor(message.author.username)
        .setColor("#FFFF00")
        .addField("Utilisateur warn", `<@${wUser.id}>`)
        .addField("Channel", message.channel)
        .addField("Nombre de warns", warns[wUser.id].warns)
        .addField("Raison", reason);

    let warnchannel = message.guild.channels.find(x => x.name === "modération");
    if (!warnchannel) return message.reply("Je n'ai pas pu trouver le channel de modération (adm error)");

    warnchannel.send(warnEmbed);

    if (warns[wUser.id].warns >= 3) {
        message.guild.member(wUser).ban("Warn limit");
        warnchannel.send(`<@${wUser.id}> a été ban suite à son nombre de warn`);
    }
};


module.exports.help = {
    name: "warn"
};