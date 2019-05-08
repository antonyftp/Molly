//const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mUser) return message.reply("L'utilisateur n'existe pas");
    if (mUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Permission refusée");
    let muterole = message.guild.roles.find(x => x.name === "mute");

    if (!muterole){
        try {
            muterole = await message.guild.createRole({
                name: "mute",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel) => {
                await channel.overwritePermissions(muterole, {
                   SEND_MESSAGES: false,
                   ADD_REACTIONS: false,
                });
            })
        } catch (e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if (!mutetime) return message.reply("Tu n'as pas mentionné de temps");

    let mutechannel = message.guild.channels.find(x => x.name === "modération");

    await(mUser.addRole(muterole.id));
    mutechannel.send(`<@${mUser.id}> a été mute pour une durée de ${ms(mutetime) / 1000} secondes par <@${message.author.id}>`);

    setTimeout(function () {
        mUser.removeRole(muterole.id);
    }, ms(mutetime));
};


module.exports.help = {
    name: "tempmute"
};