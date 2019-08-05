const Mongoose = require('mongoose')

const UserModel = Mongoose.model('User', {
    full_name: { type: String, required : true },
    email: { type: String, index: true, unique : true, required : true },
    phone: { type: String, index: true, unique : true, required : true },
}, 'user')
 
const CarModel = Mongoose.model('Car', {
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plate_number:  { type: String, index: true, unique : true, required : true },
    brand: { type: String, required : true },
    model: { type: String, required : true },
    color: { type: String, required : true },
}, 'car')

const UserMethods = {
    errorOnNoUserFound(user, query_attr) {
        if (user === null) {
            throw new Error(`No user not found with ${query_attr}`)
        } 
    }
}

module.exports = {UserModel, CarModel, UserMethods}
