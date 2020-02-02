'use strict';
var config = require('../config/config.js');
var request = require("request");

var callresult  = null

module.exports.CheckRecipe = async function(variable) {
    let res = await doRequest(variable);
    return res;
}


function doRequest(variable) {
  return new Promise(
    function(resolve, reject) {
      var options = { method: 'POST',
       url: "http://www.apphost.it/ricette/rest/genericQueryWeight/?page=0",
       headers:
        { 'cache-control': 'no-cache',
          Connection: 'keep-alive',
          Host: 'www.apphost.it',
          'User-Agent': 'PostmanRuntime/7.19.0',
          'content-type': 'multipart/form-data' },
       formData: { ingredients: JSON.stringify(variable), token: "AlexaMarcoDeFelice123" } };

      request(options, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      })
    })
}
