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
          .then(resp => {
            logger.info(`CarModel: ${args.plate_number} registered successfully`)
            return resp
          })
          .catch(err => {
            logger.error("CarModel :" + err.message)
            throw err
        })
    }
}

module.exports = {Query, Mutation}