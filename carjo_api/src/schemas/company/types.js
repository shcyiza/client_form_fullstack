const {gql} = require("apollo-server-express");

const COMPANY_TYPE = gql`
    type Company {
        id: ID!
        name: String!
        code_name: String!
        first_color: String
        second_color: String
        third_color: String
        locations: [Address!]
    }
`;

const  COMPANY_QR = gql`
    extend type Query {
        Company(code_name: String, id: String): Company
    }
`;

module.exports = {COMPANY_TYPE, COMPANY_QR};
