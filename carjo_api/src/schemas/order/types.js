const {gql} = require("apollo-server-express");

const ORDER_TYPES = gql`
    type Order {
        id: ID!
        offer: Offer!
        car: Car!
        address: Address!
        user: User!
        intervention_date: String!
        intervention_timeframe: String!
        intervention_id: String
        is_paid: Boolean
        payment_ref: String
    }
    input OrderDraft {
        account_id: String
        offer: String!
        car: String!
        address: String!
        intervention_date: String!
        intervention_timeframe: String!
    }
`;

const ORDERS_QR = gql`
    extend type Query {
        Orders(page: Int): [Order]
    }
`;

const USER_ORDERS_QR = gql`
    extend type Query {
        UserOrders(user: String!, page: Int): [Order]
    }
`;

const USER_ORDER_QR = gql`
    extend type Query {
        UserOrder(id: String): Order!
    }
`;

const CHECKOUT_ORDER_MTTN = gql`
    extend type Mutation {
        CheckoutOrder(order: OrderDraft): Order
    }
`;

module.exports = {
    ORDER_TYPES,
    ORDERS_QR,
    USER_ORDERS_QR,
    USER_ORDER_QR,
    CHECKOUT_ORDER_MTTN,
};
