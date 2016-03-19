'use strict';

var sendSms = require('./sendSms');

module.exports = function (event, feed, numbers) {
  sendSms(numbers, 'go phillies');
};
