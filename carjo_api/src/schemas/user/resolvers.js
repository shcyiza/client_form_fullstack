const {UserModel} = require('../../models/index')
const logger = require('../../utils/logger')

const User = {}

const Query = { 
    User(parent, args) {
        return UserModel.findOne({
            email: args.email
        }).exec()
    }
}

const Mutation = {
    RegisterUser(parent, args) {
        const user = new UserModel({...args})
        return user.save()
        .then(resp => {
            logger.info(`model User success: ${args.email} Registered successfully`)
            return resp
        }).catch(err => {
            logger.error("model User error:" + err.message)
            throw err
        })
    }
}

module.exports = {User, Query, Mutation}