const { gql } = require('apollo-server-express');
const _$merge = require('lodash.merge')
const { makeExecutableSchema } = require('graphql-tools')


// types
const Car = require('./Car/types')

//resolver
const CarResolver = require('./Car/resolvers')

const Query = gql`
  type Query {
    Car(plate_number: String!): Car
  }
`

const ClientFormShema = makeExecutableSchema({
    typeDefs: [ Query, Car ],
    resolvers:  _$merge(CarResolver)
})

module.exports = ClientFormShema
