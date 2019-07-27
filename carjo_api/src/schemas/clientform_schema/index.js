const _$merge = require('lodash.merge')
const { makeExecutableSchema } = require('graphql-tools')


// types
const CarType = require('./Car/types')

//resolver
const CarResolver = require('./Car/resolvers')

const ClientFormShema = makeExecutableSchema({
    typeDefs: [ CarType ],
    resolvers:  _$merge(CarResolver)
})

module.exports = ClientFormShema
