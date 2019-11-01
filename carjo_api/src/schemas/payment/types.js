const {gql} = require("apollo-server-express");

const PAYMENT_INFO_TYPE = gql`
    type PaymentInfo {
        internal_token: String
        order_id: String
        payment_ref: String
        payment_client_secret: String
    }
`;

const TOKENIZE_CHARGE_INFO_MTTN = gql`
    extend type Query {
        TokenizeChargeInfo(order_id: String!): PaymentInfo!
    }
`;

const UPDATE_ORDER_PAYMENT_INFO_MTTN = gql`
    extend type Mutation {
        UpdateOrderPaymentInfo(
            order_id: String!
            payment_ref: String!
            payment_client_secret: String!
        ): Order!
    }
`;

const DECODE_TOKENIZE_CHARGE_INFO_MTTN = gql`
    extend type Query {
        DecodeTokenizeChargeInfo(payment_info_token: String!): PaymentInfo!
    }
`;

const CHARGE_PAYMENT_MTTN = gql`
    extend type Mutation {
        ChargePayment(token: String!, order_id: String!): Order!
    }
`;

module.exports = {
    PAYMENT_INFO_TYPE,
    TOKENIZE_CHARGE_INFO_MTTN,
    UPDATE_ORDER_PAYMENT_INFO_MTTN,
    DECODE_TOKENIZE_CHARGE_INFO_MTTN,
    CHARGE_PAYMENT_MTTN,
};
