const {gql} = require("apollo-server-express");

const ADDRESS_TYPE = gql`
    type Address {
        id: Int!
        address: String!
        city: String!
        zip: String!
    }
`;

const REGISTER_ADDRESS_MTTN = gql`
    extend type Mutation {
        RegisterAddress(
            localisable_id: String!
            localisable: String!
            address: String!
            city: String!
            zip: String!
        ): Address
    }
`;

module.exports = {ADDRESS_TYPE, REGISTER_ADDRESS_MTTN};
