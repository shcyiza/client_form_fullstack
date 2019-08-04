const Jwt = require('jsonwebtoken')
const logger = require('./logger')

const makeUserSessionToken = function (user_id) {
    logger.debug('test', user_id)
    return Jwt.sign({user_id}, process.env.JWT_CLIENT_FORM_SECRET, { expiresIn: '24h' });
}

module.exports = {makeUserSessionToken}
