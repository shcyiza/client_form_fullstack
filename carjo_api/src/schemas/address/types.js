const {gql} = require("apollo-server-express");

const ADDRESS_TYPE = gql`
    type Address {
        id: ID!
        street: String!
        city: String!
        zip: String!
    }
`;

const REGISTER_USER_ADDRESS_MTTN = gql`
    extend type Mutation {
        RegisterUserAddress(
            street: String!
            city: String!
            zip: String!
        ): Address
    }
`;

const UPDATE_USER_ADDRESS_MTTN = gql`
    extend type Mutation {
        UpdateUserAddress(
            id: String!
            street: String
            city: String
            zip: String
        ): Address!
    }
`;

module.exports = {
    ADDRESS_TYPE,
    REGISTER_USER_ADDRESS_MTTN,
    UPDATE_USER_ADDRESS_MTTN,
};
