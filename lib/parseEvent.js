'use strict';

var sendSms = require('./sendSms');

module.exports = function (atbat, feed, numbers, data) {


    /*
        atbat = {
            pitcher: 12345,
            batter: 12345
        }
    */

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

  sendSms(numbers, 'go phillies');
};
