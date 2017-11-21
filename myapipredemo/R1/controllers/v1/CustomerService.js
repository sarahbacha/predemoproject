'use strict';
  var CustomerFD = require('../../sampleData/v1/Customer.json');
  var CustomerData = CustomerFD;


var filterService = require('../../services/filter.js');
 

exports.getCustomer = function(args, res, next) {
/**
 * Gets all customers from the system that the user has access to
 *
 * returns List
 **/
  if (Object.keys(CustomerData).length > 0) {
            res.setHeader('Content-Type', 'application/json');
                              console.log('Start Filtering......');
    filterService.filterData(CustomerData, args.filter.value).then(function(data) {
        res.end(JSON.stringify(data));
    });
                                  } else {
      res.end();
  }
}




exports.postCustomer = function(args, res, next) {
/**
 * Posts all customers from the system that the user has access to
 *
 **/
  if (Object.keys(CustomerData).length > 0) {
            res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(CustomerData[Object.keys(CustomerData)[0]] || {}, null, 2));
  } else {
      res.end();
  }
}

