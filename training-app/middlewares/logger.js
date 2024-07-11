const winston = require('winston');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});


logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

module.exports = { logger };
