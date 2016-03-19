'use strict';

var sendSms = require('./sendSms');

module.exports = function (atbat, feed, numbers, data) {
    /*
    data.vs.batting[atbat.batter][atbat.pitcher] = {
        points: 2,
        events: 1,
        games: 1,
        ppgvs: 2
    }

    data.vs.pitching[atbat.pitcher][atbat.batter] = {
        points: 2,
        events: 1,
        games: 1,
        ppgvs: 2
    }
    */

    var hitterId = atbat.hitter_mlbamid;
    var pitcherId = atbat.pitcher_mlbamid;
    var interesting = isInteresting(hitterId, pitcherId);

    if (interesting) {
        var hitterName = getPlayerName(hitterId);
        var pitcherName = getPlayerName(pitcherId);

        var message = generateMessage(hitterName, pitcherName);
        feed.push(message);

        sendSms(numbers, message);
    }

    function isInteresting(batterId, pitcherId) {
        var battingData = data.vs.batting;
        var currentMatchup = battingData[batterId][pitcherId];
        return true;
    }

    function generateMessage(hitterName, pitcherName) {
        return hitterName + ' is batting vs ' + pitcherName;
    }

    function getPlayerName(playerId) {
        return data.players[playerId].mlb_name;
    }
};
