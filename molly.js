// ---------------------------------------------------------------------------------------- //
//                                      Initialisation                                      //
// ---------------------------------------------------------------------------------------- //


const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

config({
   path: __dirname + "/.env"
});

["command"].forEach(handler => {
   require(`./handler/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Le bot est en ligne ! Mon nom est ${client.user.username}`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "retourner au drop pod",
            type: "PLAYING"
        }
    })
});

// ---------------------------------------------------------------------------------------- //
//                                     Command parsing                                      //
// ---------------------------------------------------------------------------------------- //

client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        await command.run(client, message, args);

});

// ---------------------------------------------------------------------------------------- //
//                                       All events                                         //
// ---------------------------------------------------------------------------------------- //

client.on("guildMemberAdd", member  =>{
    let membre = member.guild.roles.find('name', 'Membre');

    client.channels.find(x => x.id === '462017313516945448').send(`Bienvenue <@${member.id}> sur le discord francophone du jeu Deep Rock Galactic !\nPense à lire les channels <#580824056702697498> et <#580825741021806602> ainsi qu'à t'attribuer tes rôles dans le channel <#462222791022739456>.`);
    member.addRole(member);
});

client.on('guildMemberAdd', member => {
    const welcomechannel = member.guild.channels.find(x => x.id === '513053941567717429');

    var newuserjoinembed = new Discord.RichEmbed()
        .setColor('00FF00')
        .setAuthor(member.user.tag + ' a rejoins le serveur', member.user.displayAvatarURL)
        .setFooter(`User joined`)

        .addField(':inbox_tray:', member.user.tag)

        .setTimestamp();
    return welcomechannel.send(newuserjoinembed);
});

client.on('guildMemberRemove', member => {
    const goodbyechannel = member.guild.channels.find(x => x.id === '513053941567717429');

    var newuserjoinembed = new Discord.RichEmbed()
        .setColor('#FF0000')
        .setAuthor(member.user.tag + ' a quitté le serveur', member.user.displayAvatarURL)
        .setFooter(`User left`)

        .addField(`:outbox_tray: ${member.user.tag}`)

        .setTimestamp();
    return goodbyechannel.send(newuserjoinembed);
});

client.login(process.env.TOKEN);