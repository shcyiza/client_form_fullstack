const { gql } = require('apollo-server-express');

const typeDef = gql`
    type Query {
        User(email: String!): User
    },

    type Mutation {
        RegisterUser(
            full_name: String!,
            email: String!,
            phone: String!
        ): User!
    },

    type User {
        id: ID!,
        full_name: String!,
        email: String!,
        phone: String!,
        token: String
    }
`

module.exports = typeDef