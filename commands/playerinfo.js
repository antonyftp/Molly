const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let iUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!iUser) return message.channel.send("Je n'ai pas trouvé l'utilisateur");

    let roles = iUser.roles.array();

    let icon = iUser.user.avatarURL;
    let infoEmbed = new Discord.RichEmbed()
    .setDescription(`Info ${iUser}`)
    .setColor("#3ced2f")
    .setThumbnail(icon)
    .addField("Nom / Surnom", `${iUser.displayName}`)
    .addField("ID", `${iUser.id}`)
    .addField("Roles", `${roles.join(" ")}`)
    .addField("Date de création", `${iUser.user.createdAt}`)
    .addField("Date d'arrivée", `${iUser.joinedAt}`)
    .addField("Channel vocal", `${iUser.voiceChannel}`);

    message.channel.send(infoEmbed);
};

module.exports.help = {
    name: "playerinfo"
};
