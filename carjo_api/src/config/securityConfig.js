const jwtMiddleware = require("express-jwt");
const logger = require("../utils/logger");
const {AUTHORIZED_USER} = require("../utils/constances");

const securityFilter = {
    jwtFilter: jwtMiddleware({secret: process.env.JWT_CLIENT_FORM_SECRET}),
    adminFirewall(token, email) {
        if (!token && !AUTHORIZED_USER.includes(email)) {
            logger.warn(`POST ${path} received an unauthorized admin request`);
            throw new Error(
                `POST ${path} received an unauthorized admin request`,
            );
        }
    },
    authenticationErrorFilter(path) {
        return (err, req, res, next) => {
            if (err.name === "UnauthorizedError") {
                res.statusCode = 404;
                res.send({message: "Unauthorized", status: 404});
                logger.warn(`POST ${path} recieved Unauthorize request`);
                throw new Error(`POST ${path} recieved Unauthorize request.`);
            }
            console.log("test", req);
            next();
        };
    },
};

module.exports = securityFilter;
