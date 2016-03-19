'use strict';


const Hapi = require('hapi');
const Mongodb = require('mongodb');
const Routes = require('./routes');
const Data = require('../data/report.json');


module.exports = (callback) => {

    const server = new Hapi.Server();
    server.connection({ host: 'localhost' });

    server.start((err) => {

        if (err) {
            return callback(err);
        }

        server.bind({
            data: Data
        });

        server.route(Routes);

        server.start((err) => {

            return callback(err, server);
        });
    });
};
