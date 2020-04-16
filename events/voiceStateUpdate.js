const mollydb = require("../js/mollydb");
const config = require("../json/config.json");
const utils = require("./utils/voiceStateUpdate.utils")

module.exports = async (client, oldState, newState) => {
    if (!oldState.channel && newState.channel) {
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        mollydb.query(`UPDATE discord.members SET lastConnected = '${date}' WHERE discordID = ${newState.id}`, function (err) {
            if (err) throw err;
        });
        switch (newState.channel.id) {
            case config.discord.autochannels.beginner:
                 utils.createBeginner(newState);
                break;
            case config.discord.autochannels.fun:
                utils.createFun(newState);
                break;
            case config.discord.autochannels.tryhard:
                utils.createTryHard(newState);
                break;
            case config.discord.autochannels.deepdive:
                utils.createDeepDive(newState);
                break;
            case config.discord.autochannels.stream:
                utils.createStream(newState);
                break;
            default:
                break;
        }
    } else if (oldState.channel && newState.channel) {
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        mollydb.query(`UPDATE discord.members SET lastConnected = '${date}' WHERE discordID = ${newState.id}`, function (err) {
            if (err) throw err;
        });
        switch (newState.channel.id) {
            case config.discord.autochannels.beginner:
                utils.createBeginner(newState);
                break;
            case config.discord.autochannels.fun:
                utils.createFun(newState);
                break;
            case config.discord.autochannels.tryhard:
                utils.createTryHard(newState);
                break;
            case config.discord.autochannels.deepdive:
                utils.createDeepDive(newState);
                break;
            case config.discord.autochannels.stream:
                utils.createStream(newState);
                break;
            default:
                break;
        }
        if (oldState.channel.name.startsWith("Débutant") || oldState.channel.name.startsWith("Fun") || oldState.channel.name.startsWith("Try Hard") || oldState.channel.name.startsWith("Deep Dive") || oldState.channel.name.startsWith("Stream")) {
            if (oldState.channel.members.array().length === 0)
                oldState.channel.delete().then(`${oldState.member.displayName} channel deleted`);
        }
    } else if (oldState.channel && !newState.channel) {
        if (oldState.channel.name.startsWith("Débutant") || oldState.channel.name.startsWith("Fun") || oldState.channel.name.startsWith("Try Hard") || oldState.channel.name.startsWith("Deep Dive") || oldState.channel.name.startsWith("Stream")) {
            if (oldState.channel.members.array().length === 0)
                oldState.channel.delete().then(`${oldState.member.displayName} channel deleted`);
        }
    } else
        console.log("T'as niqué la matrice 😮");
};
