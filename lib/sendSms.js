'use strict';

var qs = require('querystring');
var _ = require('lodash');
var Wreck = require('wreck');

var wreck = Wreck.defaults({
    baseUrl: 'https://api.tropo.com/1.0/'
});

module.exports = function(toNumbers, message) {
    var defaultParams = {
        action: 'create',
        token: process.env.TROPO_API_TOKEN,
        messageText: message
    };

    return _(toNumbers)
        .map(function(number) {
            return _.extend({}, defaultParams, { numberToSMS: number });
        })
        .map(function(params) {
            return '/session?' + qs.stringify(params);
        })
        .map(function(uri) {
            return wreck.post(uri);
        })
        .value();
};
