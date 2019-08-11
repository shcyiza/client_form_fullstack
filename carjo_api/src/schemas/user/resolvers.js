const {UserModel} = require('../../models/index')
const logger = require('../../utils/logger')
const {findOrCreateAktiContact} = require('../../utils/akti')

const User = {}



const UserQr = {
    User(parent, {email, id}) {
        const qr = {}
        if(email) qr.email = email;
        if(id) qr._id = id;

        return UserModel.findOne(qr).then(user => {
            console.log(user)
            if(user) {
                if(!user.akti_account_id) findOrCreateAktiContact(user, (akti_user) => {
                    return UserModel.findOneAndUpdate({_id: id}, {akti_contact_id: akti_user.contactID}).exec()
                })
            }
            return user
        })
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