const { gql } = require('apollo-server-express');

const typeDef = gql`
    type Query {
        Car(plate_number: String!): Car
    },

    type Mutation {
        registerCar(
        plate_number: String!,
        brand: String!,
        model: String!,
        color: String!
        ): Car
    },

    type Car {
        id: ID!,
        plate_number: String,
        brand: String,
        model: String,
        color: String
    }
`

module.exports = typeDef