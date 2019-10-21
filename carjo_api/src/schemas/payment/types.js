const {gql} = require("apollo-server-express");

const CHARGE_PAYMENT_MTTN = gql`
    extend type Mutation {
        ChargePayment(token: String!, order_id: String!): Order!
    }
`;

module.exports = {CHARGE_PAYMENT_MTTN};
