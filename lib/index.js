'use strict';


const Hapi = require('hapi');
const Mongodb = require('mongodb');
const Routes = require('./routes');
const Data = require('../data/report.json');
const PhoneNumbers = require('../data/phonenumbers.json');


module.exports = (callback) => {

    const server = new Hapi.Server();
    server.connection({ port: 3000 });

    server.start((err) => {

        if (err) {
            return callback(err);
        }

        server.bind({
            data: Data,
            phoneNumbers: PhoneNumbers,
            feed: []
        });

        server.route(Routes);

        server.start((err) => {

            return callback(err, server);
        });
    });
};
