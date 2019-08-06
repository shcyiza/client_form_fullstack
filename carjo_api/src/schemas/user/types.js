const { gql } = require('apollo-server-express');

const USER_TYPE = gql`
    type User {
        id: ID!,
        full_name: String!,
        email: String!,
        phone: String!
    }
`

const USER_QR = gql`
    extend type Query {
        User(email: String, id: String): User
    }
`

const REGISTER_USER_MTTN = gql`
    extend type Mutation {
        RegisterUser(
            full_name: String!,
            email: String!,
            phone: String!
        ): User!
    }
`

module.exports = {USER_QR, USER_TYPE, REGISTER_USER_MTTN}