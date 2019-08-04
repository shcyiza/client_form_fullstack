const { gql } = require('apollo-server-express');

const typeDef = gql`
    extend type Query {
        Car(plate_number: String!): Car
    },

    extend type Mutation {
        RegisterCar(
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