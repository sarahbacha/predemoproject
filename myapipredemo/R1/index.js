config = require('./configuration/config');
var app = require('connect')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./swaggerConfig/input.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
        // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(config.swaggerRouterOptions));

    // Start the server
    http.createServer(app).listen(config.serverPort, function () {
            console.log('Your server is listening on port %d (http://localhost:%d)', config.serverPort, config.serverPort);
      console.log('Swagger-ui is available on http://localhost:%d/docs', config.serverPort);
          });
});
