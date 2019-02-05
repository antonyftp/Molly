console.log("Molly> Lancement en cours...")

const Discord = require('discord.js');
const bot = new Discord.Client();
const yourID = "138694992926343168";
const setupCMD = "!createrolemessage"
let initialMessage = `**Clique sur l'emoji associé à un rôle pour avoir le rôle voulu. Si tu veux t'enlever le rôle, il suffit juste d'enlever la réaction que tu as mise !**`;
const roles = ["PC", "Xbox", "Gunner", "Driller", "Engineer", "Scout", "Notif", "Experimental"];
const reactions = ["💻", "🎮", "🔫", "💣", "🔧", "🔦", "🔔", "💊"];
const config = require("./config.json");

// ------------------------- KAZOU PART ------------------------- //

bot.on('ready', () => {
console.log(`Molly> Lancé avec succès. Sur ${bot.guilds.size} serveur(s) avec ${bot.users.size} user(s)`)
});

bot.on("guildMemberAdd", member  =>{
   let membre = member.guild.roles.find('name', 'Membre');
   bot.channels.find('id', '462017313516945448').send(`Bienvenue <@${member.id}> sur le discord francophone du jeu Deep Rock Galactic ! Pense à lire le #informations📋 et le #annonces🔔`);
   member.addRole(membre);
   
});

// ------------------------- TRAKIX PART ------------------------- //

bot.on("message", async message => {

    if(message.author.bot) return;
    
    if(message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    
    if(command === "ping") {
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    }
    
    
    if(command === "kick") {
      if(!message.member.roles.some(r=>["Administrateur", "Moderateur"].includes(r.name)) )
        return message.reply("Tu n'a pas la permission de faire cette commande !");
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Merci de mentionner un membre valide");
      if(!member.kickable) 
        return message.reply("Je ne peux pas kick cette utilisateur. As-tu les permissions suffisantes ?");
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "Tu n'a pas mentionner de raison.";
      await member.kick(reason)
        .catch(error => message.reply(`Désolé ${message.author}. je ne peux pas le kick car : ${error}`));
      message.reply(`${member.user.tag} a été kick par ${message.author.tag} pour la raison suivante : ${reason}`);
  
    }
    
   
    if(command === "ban") {
      if(!message.member.roles.some(r=>["Administrateur", "Moderateur"].includes(r.name)) )
        return message.reply("Tu n'a pas la permission de faire cette commande !");
      
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("Merci de mentionner un membre valide");
      if(!member.bannable) 
        return message.reply("Je ne peux pas ban cette utilisateur. As-tu les permissions suffisantes ?");
  
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "Tu n'a pas mentionner de raison.";
      
      await member.ban(reason)
        .catch(error => message.reply(`Désolé ${message.author}. Je ne peux pas le ban car : ${error}`));
      message.reply(`${member.user.tag} a été ban par ${message.author.tag} pour la raison suivante : ${reason}`);
    }
    
   
    if(command === "purge") {
      const deleteCount = parseInt(args[0], 10);
    
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Merci de mentionner un nombre entre 2 et 100");
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Je ne peux pas effectuer la suppression car : ${error}`));
    }
  });

bot.on('guildMemberAdd', member => {
  const welcomechannel = member.guild.channels.find('id', '513053941567717429')

  var newuserjoinembed = new Discord.RichEmbed()
    .setColor('00FF00')
    .setAuthor(member.user.tag + ' a rejoins le serveur', member.user.displayAvatarURL)
    .addField(`:inbox_tray: ${member.user.tag}`)
    .setFooter(`User joined`)
    .setTimestamp()
    return welcomechannel.send(newuserjoinembed);
});

bot.on('guildMemberRemove', member => {
  const goodbyechannel = member.guild.channels.find('id', '513053941567717429')

  var newuserjoinembed = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor(member.user.tag + ' a quitté le serveur', member.user.displayAvatarURL)
    .addField(`:outbox_tray: ${member.user.tag}`)
    .setFooter(`User left`)
    .setTimestamp()
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
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
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
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
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
    
    
        

bot.login('NDg4NjUyMzU4NDY1NzQ4OTkz.DnfW3Q._SxJ7I7hK7noYGpcjyIa7nQ5nxk');
