'use strict';

let constant = require("./config/constant");
let express = require('express');
let app = express();
let server = require('http').createServer(app);

require("./config/express")(app);
require("./api/routes/routes")(app, express);

server.listen(constant.port, () => {
    console.log(`Node Server's Running on http://${constant.host}:${constant.port}`);
});