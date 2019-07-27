const { CarModel } = require('../../../models/index')
const logger = require('../../../utils/logger')

const Query = { 
    Car(parent, args) {
        return CarModel.findOne({
            plate_number: args.plate_number
        }).exec()
    }
}

const Mutation = {
    registerCar(parent, args) {
        const car = new CarModel({...args})
        return car.save()
          .then(resp => resp)
          .catch(err => {
            err.status = 404
            logger.error(err.message)
            throw err
        })
    }
}

module.exports = {Query, Mutation}