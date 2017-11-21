config = require('./configuration/config');
var app = require('express')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');

module.exports = {
    init: init
};

function init(originalApp, info, callback) {
    try {
        // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
        var spec = fs.readFileSync(__dirname + '/swaggerConfig/input.yaml', 'utf8');
        var swaggerDoc = jsyaml.safeLoad(spec);

        // Initialize the Swagger middleware
        swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
            try {
                var apiurl = info.apiPath;
                // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
                app.use(middleware.swaggerMetadata());

                // Validate Swagger requests
                app.use(middleware.swaggerValidator());

                // Serve the Swagger documents and Swagger UI
                app.use(apiurl, middleware.swaggerUi());
                // Route validated requests to appropriate controller
                app.use(middleware.swaggerRouter(config.swaggerRouterOptions));

                originalApp.use(app);
                callback(null, true);
            } catch (error) {
                console.log("Error inside: ", error);
                callback(error, false);
            }

        });
    } catch (error) {
        console.log("Throwing error: ", error);
        callback(error, false);
    }
}