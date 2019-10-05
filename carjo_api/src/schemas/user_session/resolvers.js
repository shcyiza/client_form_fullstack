const {generateDigitToken} = require("../../utils/token_generator");
const logger = require("../../utils/logger");
const {UserModel} = require("../../models/index");
// FIXME [IJP] 2019-08-18: should avoid this dependency if possible
const {makeUserSessionToken} = require("../../utils/jwt");
const twilio_client = require("twilio")(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN,
);

const {
    STATUS,
    composeClaimKey,
    onNoUserFound,
    onError,
    delTokenToClaim,
    cacheTokenToClaim,
} = require("./helpers");

const RequestUserSessionMttn = {
    async RequestUserSession(parent, {email}, {redis}) {
        try {
            const claimed_user = await UserModel.findOne({email});

            onNoUserFound(claimed_user);

            const token_to_claim = generateDigitToken(6);
            const claim_data = cacheTokenToClaim(
                token_to_claim,
                redis,
                claimed_user,
            );

            await twilio_client.messages.create({
                body: `Hey ${claimed_user.first_name}, Your code for Carjo Service is: ${token_to_claim}`,
                from: process.env.TWILIO_NUMBER,
                to: `+${claimed_user.phone}`,
            });

            logger.debug(`Login token sent to user with email ${email}`);

            return claim_data;
        } catch (err) {
            onError(err);
        }
    },
};

const ClaimUserSessionMttn = {
    ClaimUserSession(parent, {email, request_timestamp, claim_token}, {redis}) {
        return UserModel.findOne({email})
            .then(user => {
                onNoUserFound(user);

                const {id, akti_account_id, akti_contact_id} = user;
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
                            user_session_token: makeUserSessionToken(
                                id,
                                akti_account_id,
                                akti_contact_id,
                            ),
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
