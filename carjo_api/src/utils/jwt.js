const Jwt = require("jsonwebtoken");

const makeUserSessionToken = function(user_id) {
    return Jwt.sign({user_id}, process.env.JWT_CLIENT_FORM_SECRET, {
        expiresIn: "2h",
    });
};

module.exports = {makeUserSessionToken};
