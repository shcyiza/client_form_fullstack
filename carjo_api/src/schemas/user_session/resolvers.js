const {generateDigitToken} = require('../../utils/token_generator')
const moment = require('moment')
const logger = require('../../utils/logger')
const {UserModel, UserMethods} = require('../../models/index')
const {makeUserSessionToken} = require('../../utils/jwt')

const STATUS = ["pending", "active", "altered"]

const composeClaimKey = (user_id, request_timestamp) => (  
    `carjo_api:session_request:${user_id}:${request_timestamp}`
)

const onNoUserFound = function(user) { UserMethods.errorOnNoUserFound(user, 'email') }

const onError = function(err) {
    logger.error(`User Session request error: ${err.message}`)
    throw err
}

const delTokenToClaim = function(redis, key, cbOnSuccess)  {
    redis.del(key).then(cbOnSuccess).catch(err => {
        onError(err)
    });
}

const cacheTokenToClaim = (redis, {id, email}, passed_status = {}) => {

    const request_timestamp = moment().format('YYMMDDHHmmss')
    const key = composeClaimKey(id, request_timestamp);
    const token_to_claim = generateDigitToken(8);

    return redis.set(
        key, token_to_claim, 'NX', 'EX', 600
    ).then(resp => {
        logger.debug(`token to claim for ${email} created at key: ${key}`)

        if (resp) return {
            status: passed_status.status || STATUS[0],
            request_timestamp,
            message: passed_status.msg || null
        }

        const err = new Error(`could not create token for ${email}`)
        onError(err)

    }).catch(err => {
        onError(err)
    })
}

const Mutation = {
    RequestUserSession(parent, {email}, {redis}) {
        
        return UserModel.findOne({email}).then(user => {
            onNoUserFound(user)

            return cacheTokenToClaim(redis, user)
            
        }).catch(err => {
            onError(err)
        })
    },

    ClaimUserSession: (parent, {email, request_timestamp, claim_token}, {redis}) => {

        return UserModel.findOne({email}).then(user => {
            onNoUserFound(user)

            const id = user.id
            const key = composeClaimKey(id, request_timestamp);

            return redis.get(key).then(token_to_claim => {
                if (token_to_claim === claim_token) {

                    delTokenToClaim(redis, key, () => {
                        logger.debug(`Successfull claim from ${email} token to claim deleted.`)
                    })

                    return {
                        status: STATUS[1], 
                        user_session_token: makeUserSessionToken(id)
                    };
                }

                delTokenToClaim(redis, key, resp => {
                    logger.warn(
                        `Invalid login claim made for ${email} ${resp ? 'refreshing': 'creating new'} token to claim.`
                    )
                })

                const passed_status = {status: STATUS[2], msg: "Invalide token, please try again"}

                return cacheTokenToClaim(redis, user, passed_status)
            });

        }).catch(err => {
            onError(err)
        })
    },
};

module.exports = {Mutation}