const Discord = require('discord.js');
const molly = new Discord.Client();
const token = require('../json/token');

const client = new Discord.Client();

molly.on('ready', () => {
    console.log(`I am Ready !`);
});

molly.on('message', async message => {
    if (message.content === '!ping') {
        await message.channel.send(`Pong ! <@${message.author.id}>`);
    }
});

molly.login(token.token).then(r => console.log("Connected to discord API !"));
