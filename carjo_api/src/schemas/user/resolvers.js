const {UserModel} = require('../../models/index')
const logger = require('../../utils/logger')

const User = {}

const UserQr = {
    User(parent, {email, id}) {
        const qr = {}
        if(email) qr.email = email;
        if(id) qr._id = id;

        return UserModel.findOne(qr).exec()
    }
}

const RegisterUserMttn = {
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

module.exports = {User, UserQr, RegisterUserMttn}