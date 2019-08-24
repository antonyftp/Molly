console.log("Molly> Lancement en cours...");

const Discord = require("discord.js");
const bot = new Discord.Client();
const yourID = "138694992926343168";
const setupCMD = "!createrolemessage";
let initialMessage = `**Clique sur l'emoji associé à un rôle pour avoir le rôle voulu. Si tu veux t'enlever le rôle, il suffit juste d'enlever la réaction que tu as mise !**`;
const roles = ["PC", "Xbox", "Gunner", "Driller", "Engineer", "Scout", "Notif", "Experimental"];
const reactions = ["💻", "🎮", "🔫", "💣", "🔧", "🔦", "🔔", "💊"];
const config = require("../json/config.json");
const token = require("../json/token.json");
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
        console.log ("Je n'ai pas trouvé la commande.");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`../commands/${f}`);
        console.log(`${f} loaded !`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on('ready', () => {

    console.log(`Molly> Lancé avec succès. Sur ${bot.guilds.size} serveur(s) avec ${bot.users.size} user(s)`)

    bot.user.setPresence({
        status: "online",
        game: {
            name: "retourner au drop pod",
            type: "PLAYING",
        }
    })
});

bot.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot,message,args);
});

bot.on("guildMemberAdd", member  =>{
   let membre = member.guild.roles.find('name', 'Membre');
    //bot.channels.find('id', '462017313516945448').send(`Bienvenue <@${member.id}> sur le discord francophone du jeu Deep Rock Galactic !\nPense à lire les channels <#580824056702697498> et <#580825741021806602> ainsi qu'à t'attribuer tes rôles dans le channel <#462222791022739456>.`);
    bot.channels.find(x => x.id === '462017313516945448').send(`Bienvenue <@${member.id}> sur le discord francophone du jeu Deep Rock Galactic !\nPense à lire les channels <#580824056702697498> et <#580825741021806602> ainsi qu'à t'attribuer tes rôles dans le channel <#462222791022739456>.`);
   member.addRole(membre);
});

bot.on('guildMemberAdd', member => {
    const welcomechannel = member.guild.channels.find(x => x.id === '513053941567717429');

  var newuserjoinembed = new Discord.RichEmbed()
    .setColor('00FF00')
    .setAuthor(member.user.tag + ' a rejoins le serveur', member.user.displayAvatarURL)
    .addField(`:inbox_tray: ${member.user.tag}`)
    .setFooter(`User joined`)
    .setTimestamp();
    return welcomechannel.send(newuserjoinembed);
});

bot.on('guildMemberRemove', member => {
    const goodbyechannel = member.guild.channels.find(x => x.id === '513053941567717429');

  var newuserjoinembed = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor(member.user.tag + ' a quitté le serveur', member.user.displayAvatarURL)
    .addField(`:outbox_tray: ${member.user.tag}`)
    .setFooter(`User left`)
    .setTimestamp();
    return goodbyechannel.send(newuserjoinembed);
});

// ------------------------- ROLE REACT PART ------------------------- //

if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Clique sur l'emoji ci-dessous pour avoir le role **"${role}"** !`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id === yourID && message.content.toLowerCase() === setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);
                }
            });
        }
    }
});


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === "MESSAGE_REACTION_REMOVE"){

        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);

        if (msg.author.id === bot.user.id && msg.content !== initialMessage){

            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];

            if (user.id !== bot.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);

                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })

    }
});


bot.login(token.token);
