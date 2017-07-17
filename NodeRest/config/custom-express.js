let app = require('express')();
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let morgan = require('morgan');
let logger = require('../services/logger.js');

module.exports = () => {

    app.use(morgan("common", {
        stream: {
            write: (mensagem) => {
                logger.info('Logando a requisição: ' + mensagem);
            }
        }
    }));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    consign()
    .include('controllers')
    .then('persistencia')
    .then('services')
    .into(app);

    return app;
}