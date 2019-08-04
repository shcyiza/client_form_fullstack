const _$merge = require('lodash.merge')
const { makeExecutableSchema } = require('graphql-tools')

const UserType = require('./user/types') // !!! main type where Query and Mutation types are defined
const UserSessionType = require('./user_session/types')
const CarType = require('./car/types')

const UserResolver = require('./user/resolvers')
const UserSessionResolver= require('./user_session/resolvers')
const CarResolver = require('./car/resolvers')

const ClientFormShema = makeExecutableSchema({
    typeDefs: [ UserType, UserSessionType, CarType ],
    resolvers:  _$merge(UserResolver, UserSessionResolver, CarResolver)
})

module.exports = ClientFormShema
