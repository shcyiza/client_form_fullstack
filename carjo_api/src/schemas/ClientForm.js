const { makeExecutableSchema } = require('graphql-tools')
const BASE_TYPE = require('../utils/gql_base_type')

const {USER_TYPE, AUTH_USER_QR} = require('./user/types') // !!! main type where Query and Mutation types are defined
const {CAR_TYPE, USER_CARS_QR, REGISTER_CAR_MTTN} = require('./car/types')

const {User, AuthUserQr} = require('./user/resolvers')
const {Car, RegisterCarMttn} = require('./car/resolvers')

const ClientFormShema = makeExecutableSchema({
    typeDefs: [
        BASE_TYPE,
        CAR_TYPE,
        USER_TYPE,
        AUTH_USER_QR, 
        USER_CARS_QR,
        REGISTER_CAR_MTTN 
    ],
    resolvers:  {
        Query: {
            ...AuthUserQr,
        },
        Mutation: {
            ...RegisterCarMttn
        },
        User, Car
    }
})

module.exports = ClientFormShema
