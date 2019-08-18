const jwtMiddleware = require("express-jwt");
const logger = require("../utils/logger");
const securityFilter = {
    jwtFilter: jwtMiddleware({secret: process.env.JWT_CLIENT_FORM_SECRET}),
    authenticationErrorFilter: function (path) {
        return (err, req, res, next) => {
            if (err.name === "UnauthorizedError") {
                res.statusCode = 404;
                res.send({message: "Unauthorized", status: 404});
                logger.warn(
                    `POST ${path} recieved Unauthorize request`,
                );
                //fixme: why?
                return null;
            }
            next();
        };
    }
};

module.exports = securityFilter;