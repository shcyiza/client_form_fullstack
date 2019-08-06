const _$merge = require('lodash.merge')
const { makeExecutableSchema } = require('graphql-tools')
const BASE_TYPE = require('../utils/gql_base_type')

const {USER_TYPE, USER_QR} = require('./user/types') // !!! main type where Query and Mutation types are defined
const {CAR_TYPE, USER_CARS_QR, REGISTER_CAR_MTTN} = require('./car/types')

const {User, UserQr} = require('./user/resolvers')
const {Car, UserCarsQr, RegisterCarMttn} = require('./car/resolvers')

const ClientFormShema = makeExecutableSchema({
    typeDefs: [
        BASE_TYPE,
        USER_TYPE,
        USER_QR, 
        CAR_TYPE,
        USER_CARS_QR,
        REGISTER_CAR_MTTN 
    ],
    resolvers:  {
        Query: {
            ...UserQr,
            ...UserCarsQr 
        },
        Mutation: {
            ...RegisterCarMttn
        },
        User, Car
    }
})

module.exports = ClientFormShema
