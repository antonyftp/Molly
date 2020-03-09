const { RichEmbed } = require("discord.js");
const { promptMessage } =  require("../../functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kick le membre mentionné",
    usage: "!kick @username",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();
        if (!args[0]) {
            return message.reply("Vous n'avez mentionné personne")
                .then(m => m.delete(5000));
        }
        if (!args[1]) {
            return message.reply("Vous n'avez pas donner de raison")
                .then(m => m.delete(5000));
        }
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Vous n'avez pas la permission de kick")
                .then(m => m.delete(5000));
        }
        if (!message.guild.me.hasPermission("KICK_MEMBER")) {
            return message.reply("❌ Je n'ai pas la permission de kick, merci de contacter un membre de l'administration")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toKick) {
            return message.reply("La personne mentionnée n'est pas sur ce discord")
                .then(m => m.delete(5000));
        }
        if (message.author.id === toKick.id) {
            return message.reply("Tu ne peux pas te kick toi même, t'es con ou quoi ?")
                .then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor("#FF9C01")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`Kick <@${toKick.user.id}>`)

            .addField("**Membre kick :**", `<@${toKick.user.id}>`)
            .addField("**Kick par :**", `<@${message.author.id}>`)
            .addField("**Raison :**", args.slice(1).join(" "));

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`Cette vérification deviendra invalide après 30 secondes.`)
            .setDescription(`Confirmez vous le kick de ${toKick} ?`);

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();
                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Erreur critique : ${err}`)
                    });
                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();
                message.reply(`Kick annulé.`)
                    .then(m => m.delete(10000));
            }
        });
    }
};