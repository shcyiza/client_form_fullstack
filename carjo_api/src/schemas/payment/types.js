const {gql} = require("apollo-server-express");

const CHARGE_CARD_MTTN = gql`
    extend type Mutation {
        ChargeCard(token: String!, order_id: String!): Order!
    }
`;

module.exports = {CHARGE_CARD_MTTN};
