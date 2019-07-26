const {
    GraphQLID,
    GraphQLString,
    //GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql')

const { CarModel } = require('../../models/index')

const CarType = new GraphQLObjectType({
    name: 'Car',
    fields: {
        id: { type: GraphQLID },
        plate_number: { type: GraphQLString },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        color: { type: GraphQLString }
    }
})

const CarSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            Car: {
                type: CarType,
                args: {
                    plate_number: { type: GraphQLNonNull(GraphQLString) }
                },
                resolve: (root, args) => {
                    return CarModel.findOne({
                        plate_number: args.plate_number
                    }).exec()
                }
            }
        }
    })
})

module.exports = {CarSchema}
