const Jwt = require("jsonwebtoken");

const makeUserSessionToken = function(user_id, account_id, contact_id) {
    return Jwt.sign(
        {user_id, account_id, contact_id},
        process.env.JWT_CLIENT_FORM_SECRET,
        {
            expiresIn: "2h",
        },
    );
};

const makeAdminToken = function(admin_token, email) {
    return Jwt.sign({admin_token, email}, process.env.JWT_CLIENT_FORM_SECRET);
};

module.exports = {makeUserSessionToken, makeAdminToken};
