const {CarModel} = require('../../models/index')
const logger = require('../../utils/logger')

const Car = {};

const Query = { 
    Car(parent, {plate_number}) {
        return CarModel.findOne({plate_number}).exec()
    }
};

const Mutation = {
    RegisterCar(parent, args) {
        const car = new CarModel({...args})
        return car.save()
        .then(resp => {
            logger.info(`model Car successful: ${args.plate_number} Registered successfully`)
            return resp
        }).catch(err => {
            logger.error(`model Car error: ${err.message}`)
            throw err
        })
    }
};

module.exports = {Car, Query, Mutation}