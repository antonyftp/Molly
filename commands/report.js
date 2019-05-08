const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");
    let reason = args.join(" ").slice(22); // .slice(22) car on veut enlever l'id du bot du tableau
    let rIcon = rUser.user.avatarURL;

    if (!reason) return message.channel.send("Tu n'a pas mentionné de raison");

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Report")
    .setColor("#ff1323")
    .setThumbnail(rIcon)
    .addField("Reported User", `${rUser} ID: ${rUser.id}`)
    .addField("Report par", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Date", message.createdAt)
    .addField("Raison", reason);

    let reportschannel = message.guild.channels.find(x => x.name === "report");
    if (!reportschannel) return message.channel.send("Je n'ai pas pu trouver le channel de report");

    message.delete();
    reportschannel.send(reportEmbed);
};

module.exports.help = {
    name: "report"
};
