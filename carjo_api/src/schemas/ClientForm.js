/* eslint-disable prettier/prettier */
const { makeExecutableSchema } = require('graphql-tools');
const BASE_TYPE = require("../utils/gql_base_type");

const {PRIVATE_USER_TYPE, AUTH_USER_QR} = require("./user/types");
const {CAR_TYPE, USER_CARS_QR, REGISTER_CAR_MTTN} = require("./car/types");

const {User, cars, addresses, AuthUserQr} = require("./user/resolvers");
const {Car, RegisterCarMttn} = require("./car/resolvers");

const {ADDRESS_TYPE, REGISTER_USER_ADDRESS_MTTN, UPDATE_USER_ADDRESS_MTTN} = require("./address/types");
const {RegisterUserAddressMttn, UpdateUserAddressMttn} = require("./address/resolvers");

const ClientFormSchema = makeExecutableSchema({
    typeDefs: [
        BASE_TYPE,
        CAR_TYPE,
        PRIVATE_USER_TYPE,
        ADDRESS_TYPE,
        AUTH_USER_QR, 
        USER_CARS_QR,
        REGISTER_CAR_MTTN ,
        REGISTER_USER_ADDRESS_MTTN,
        UPDATE_USER_ADDRESS_MTTN,
    ],
    resolvers:  {
        Query: {
            ...AuthUserQr,
        },
        Mutation: {
            ...RegisterCarMttn,
            ...RegisterUserAddressMttn,
            ...UpdateUserAddressMttn,
        },
        User:{...User, cars, addresses},
        Car
    }
});

module.exports = ClientFormSchema;
