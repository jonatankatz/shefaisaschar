const winston = require("winston");
const moment = require("moment")
const keyLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
   
        new winston.transports.File({ filename: `logs/ApiKeys.log`, level: 'info' })
     ]
});

module.exports = keyLogger






