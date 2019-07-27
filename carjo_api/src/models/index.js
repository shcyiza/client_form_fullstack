const Mongoose = require('mongoose')

const CarModel = Mongoose.model('Car', {
    plate_number:  { type: String, index: true },
    brand: String,
    model: String,
    color: String
}, 'car')

module.exports = {CarModel}
