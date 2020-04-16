module.exports = {
    createBeginner: function (newState) {
        newState.guild.channels.create(`Débutant - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '461945377093058561'
        }).then(channel => {
            newState.setChannel(channel);
            console.log(`${newState.member.displayName} created a beginner channel`);
        })
    },

    createFun: function (newState) {
        newState.guild.channels.create(`Fun - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '461945377093058561'
        }).then(channel => {
            newState.setChannel(channel);
            console.log(`${newState.member.displayName} created a fun channel`);
        })
    },

    createTryHard: function (newState) {
        newState.guild.channels.create(`Try Hard - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '461945377093058561'
        }).then(channel => {
            newState.setChannel(channel)
            console.log(`${newState.member.displayName} created a try hard channel`);
        })
    },

    createDeepDive: function (newState) {
        newState.guild.channels.create(`Deep Dive - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '461945377093058561'
        }).then(channel => {
            newState.setChannel(channel);
            console.log(`${newState.member.displayName} created a deep dive channel`);
        })
    },

    createStream: function (newState) {
        newState.guild.channels.create(`Stream - ${newState.member.displayName}`, {
            type: 'voice',
            parent: '461945377093058561'
        }).then(channel => {
            newState.setChannel(channel);
            console.log(`${newState.member.displayName} created a stream channel`);
        })
    }
}
