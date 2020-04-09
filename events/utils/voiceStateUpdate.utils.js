module.exports = {
    createBeginner: function (oldState, newState) {
        newState.guild.channels.create(`Débutant - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '688719826004344856'
        }).then(channel => {
            newState.setChannel(channel);
        })
    },

    createFun: function (oldState, newState) {
        newState.guild.channels.create(`Fun - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '688719826004344856'
        }).then(channel => {
            newState.setChannel(channel);
        })
    },

    createTryHard: function (oldState, newState) {
        newState.guild.channels.create(`Try Hard - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '688719826004344856'
        }).then(channel => {
            newState.setChannel(channel);
        })
    },

    createDeepDive: function (oldState, newState) {
        newState.guild.channels.create(`Deep Dive - ${newState.member.displayName}`, {
            type: 'voice',
            userLimit: '4',
            parent: '688719826004344856'
        }).then(channel => {
            newState.setChannel(channel);
        })
    },

    createStream: function (oldState, newState) {
        newState.guild.channels.create(`Stream - ${newState.member.displayName}`, {
            type: 'voice',
            parent: '688719826004344856'
        }).then(channel => {
            newState.setChannel(channel);
        })
    }
}
