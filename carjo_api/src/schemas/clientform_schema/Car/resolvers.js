const { CarModel } = require('../../../models/index')

const resolvers = {
    Query: { 
        Car(parent, args) {
            return CarModel.findOne({
                plate_number: args.plate_number
            }).exec()
        }
    }
}

module.exports = resolvers