'use strict';

var Promise = require('bluebird');
var applyFilter = require('loopback-filters');

module.exports.filterData = function (data, properties) {
  return new Promise(function (resolve, reject) {
    try {
      if (properties) {
        resolve(applyFilter(data, JSON.parse(properties)));
      } else {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
