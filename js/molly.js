const Discord   = require("discord.js");
const Enmap     = require("enmap");
const fs        = require("fs");
const token     = require("../json/token");
const mollydb   = require("./mollydb");
const bot       = new Discord.Client();

module.exports = bot;

mollydb.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database !");
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`../events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`[Event] ${eventName} loaded ✅`);
        bot.on(eventName, event.bind(null, bot));
    });
});

bot.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`../commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`[Command] ${commandName} loaded ✅`);
        bot.commands.set(commandName, props);
    });
});

bot.login(token.token).then(r => console.log("Connected to the Discord API !"));
