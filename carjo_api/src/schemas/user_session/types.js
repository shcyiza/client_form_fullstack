const { gql } = require('apollo-server-express');

const typeDef = gql`
    extend type Mutation {
        RequestUserSession(
            email: String!,
        ): UserSessionRequest,

        GenerateUserSession(
            email: String!,
            request_timestamp: String!,
            claim_token: String!,
        ): UserSessionRequest,
    },

    type UserSessionRequest {
        status: String!
        message: String
        request_timestamp: String
        user_session_token: String
    }
`

module.exports = typeDef