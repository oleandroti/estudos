let winston = require('winston');
let fs = require('fs');

if(!fs.existsSync('logs')) {
    fs.mkdir('logs');
}

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: "info",
            filename: "logs/node.log",
            maxsize: 100000,
            maxFiles: 10
        })
    ]
});