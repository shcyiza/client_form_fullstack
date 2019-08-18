const logger = require("./logger");

// FIXME [IJP] 2019-08-18: bad file naming
const onError = function(err) {
    logger.error(`User request error: ${err.message}`);
    throw err;
};

module.exports = {onError};
