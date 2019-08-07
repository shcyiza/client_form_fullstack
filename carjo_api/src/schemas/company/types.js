const { gql } = require('apollo-server-express');

const COMPANY_TYPE = gql`
    type Company {
        id: Int!,
        name: String!,
        code_name: String!,
        primary_color: String,
        secoundary_color: String,
        ternary_color: String,
        locations: [Location]!
    }
`

const LOCATION_TYPE = gql`
    type location {
        id: Int!,
        address: "Teststreet 1",
        city: "Bruxelles",
        zip: "1089"
    }
`