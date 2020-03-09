const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "ban le membre mentionné",
    usage: "!ban @username",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        if (!args[0]) {
            return message.reply("Vous n'avez mentionné personné")
                .then(m => m.delete(5000));
        }
        if (!args[1]) {
            return message.reply("Vous n'avez pas donné de raison")
                .then(m => m.delete(5000));
        }
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Vous n'avez pas la permission de kick")
                .then(m => m.delete(5000));

        }
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Je n'ai pas la permission de kick, merci de contacter un membre de l'administration")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toBan) {
            return message.reply("La personne mentionnée n'est pas sur ce discord")
                .then(m => m.delete(5000));
        }
        if (toBan.id === message.author.id) {
            return message.reply("Tu ne peux pas te ban toi même, t'es con ou quoi ?")
                .then(m => m.delete(5000));
        }
        if (!toBan.bannable) {
            return message.reply("Tu ne peux pas ban une personne hiérarchiquement supérieure à toi.")
                .then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`Kick <@${toBan.user.id}>`)

            .addField("**Membre ban :**", `<@${toBan.user.id}>`)
            .addField("**Ban par :**", `<@${message.author.id}>`)
            .addField("**Raison :**", args.slice(1).join(" "));

        const promptEmbed = new RichEmbed()
            .setColor("GREEN")
            .setAuthor(`Cette vérification deviendra invalide après 30 secondes.`)
            .setDescription(`Confirmez vous le kick de ${toBan} ?`);

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();
                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Erreur critique : ${err}`)
                    });
                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();
                message.reply(`Ban annulé.`)
                    .then(m => m.delete(10000));
            }
        });
    }
};