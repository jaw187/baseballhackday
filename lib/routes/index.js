'use strict';


module.exports = [
    {
        method: 'GET', path: '/players', handler: function (request, reply) {

            return reply(this.data.players);
        }
    },
    {
        method: 'GET', path: '/players/{playerId}', handler: function (request, reply) {

            return reply(this.data.players[request.params.playerId]);
        }
    },
    {
        method: 'GET', path: '/matchups', handler: function (request, reply) {

            return reply(this.data.matchups);
        }
    },
    {
        method: 'GET', path: '/venues', handler: function (request, reply) {

            return reply(this.data.venues);
        }
    },
    {
        method: 'GET', path: '/stats', handler: function (request, reply) {

            return reply(this.data.stats);
        }
    },
    {
        method: 'GET', path: '/bithyear', handler: function (request, reply) {

            return reply(this.data.birthyear);
        }
    }
];
