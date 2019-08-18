const logger = require('../../utils/logger');
const {UserModel} = require('../../models/index');
// FIXME [IJP] 2019-08-18: should avoid this dependency if possible
const {makeUserSessionToken} = require('../../utils/jwt');

const {
    STATUS,
    composeClaimKey,
    onNoUserFound,
    onError,
    delTokenToClaim,
    cacheTokenToClaim,
} = require("./helpers");

const RequestUserSessionMttn = {
    RequestUserSession(parent, {email}, {redis}) {
        return UserModel.findOne({email})
            .then(user => {
                onNoUserFound(user);

                return cacheTokenToClaim(redis, user);
            })
            .catch(err => {
                onError(err);
            });
    },
};

const ClaimUserSessionMttn = {
    ClaimUserSession(parent, {email, request_timestamp, claim_token}, {redis}) {
        return UserModel.findOne({email})
            .then(user => {
                onNoUserFound(user);

                const id = user.id;
                const key = composeClaimKey(id, request_timestamp);

                return redis.get(key).then(token_to_claim => {
                    if (token_to_claim === claim_token) {
                        delTokenToClaim(redis, key, () => {
                            logger.debug(
                                `Successfull claim from ${email} token to claim deleted.`,
                            );
                        });

                        return {
                            status: STATUS[1],
                            user_session_token: makeUserSessionToken(id),
                        };
                    }

                    delTokenToClaim(redis, key, resp => {
                        logger.warn(
                            `Invalid login claim made for ${email} ${
                                resp ? "refreshing" : "creating new"
                            } token to claim.`,
                        );
                    });

                    const passed_status = {
                        status: STATUS[2],
                        msg: "Invalide token, please try again",
                    };

                    return cacheTokenToClaim(redis, user, passed_status);
                });
            })
            .catch(err => {
                onError(err);
            });
    },
};

module.exports = {RequestUserSessionMttn, ClaimUserSessionMttn};
