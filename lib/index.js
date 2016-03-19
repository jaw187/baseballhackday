'use strict';


const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Mongodb = require('mongodb');
const Routes = require('./routes');
const Data = require('../data/report.json');
const PhoneNumbers = require('../data/phonenumbers.json');


const internals = {};


module.exports = (callback) => {

    const hapiOptions = {
        connections: {
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, '../public')
                }
            }
        }
    };

    const server = new Hapi.Server(hapiOptions);
    const port = process.env.PORT || 3000;
    server.connection({ port: port });

    const inertOptions = {

    }
    server.register({ register: Inert, options: inertOptions }, (err) => {

        if (err) {
            return callback(err);
        }

        server.start((err) => {

            if (err) {
                return callback(err);
            }

            server.bind({
                data: Data,
                phoneNumbers: PhoneNumbers,
                feed: []
            });

            Data.vs = internals.convertVsData(Data.vs);

            server.route(Routes);

            server.start((err) => {

                return callback(err, server);
            });
        });
    });
};


internals.convertVsData = function (data) {

    const results = {
        batting: {},
        pitching: {}
    };

    for (let i in data.batting) {
        const matchup = data.batting[i];
        if (!results.batting[matchup.player]) {
            results.batting[matchup.player] = {};
        }

        results.batting[matchup.player][matchup.nemesis] = matchup;
    }

    for (let i in data.pitching) {
        const matchup = data.pitching[i];
        if (!results.pitching[matchup.player]) {
            results.pitching[matchup.player] = {};
        }

        results.pitching[matchup.player][matchup.nemesis] = matchup;
    }

    return results;
};
