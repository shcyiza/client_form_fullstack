const { gql } = require('apollo-server-express');

const typeDef = gql`
    type Car {
        id: ID!,
        plate_number: String,
        brand: String,
        model: String,
        color: String
    }
`

module.exports = typeDef