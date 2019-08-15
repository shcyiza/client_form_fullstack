const { makeExecutableSchema } = require('graphql-tools')
const BASE_TYPE = require('../utils/gql_base_type')

const {USER_TYPE, USER_QR, REGISTER_USER_MTTN} = require('./user/types')
const {CAR_TYPE} = require('./car/types')

const {
    USER_SESSION_REQUEST_TYPE,
    REQUEST_USER_SESSION_MTTN,
    CLAIM_USER_SESSION_MTTN
} = require('./user_session/types')

const {User, UserQr, RegisterUserMttn} = require('./user/resolvers')
const {RequestUserSessionMttn, ClaimUserSessionMttn}= require('./user_session/resolvers')


const SessionManagement = makeExecutableSchema({
    typeDefs: [
        BASE_TYPE,
        CAR_TYPE,
        USER_TYPE,
        USER_QR,
        REGISTER_USER_MTTN,
        USER_SESSION_REQUEST_TYPE, 
        REQUEST_USER_SESSION_MTTN, 
        CLAIM_USER_SESSION_MTTN
    ],
    resolvers:  {
        Query: {
            ...UserQr,
        },
        Mutation: {
            ...RegisterUserMttn,
            ...RequestUserSessionMttn, 
            ...ClaimUserSessionMttn
        },
        User
    }
})

module.exports = SessionManagement
