const {UserModel} = require('../../models/index')
const logger = require('../../utils/logger')
const {findOrCreateAktiContact} = require('../../utils/akti')

const onError = function(err) {
    logger.error(`User request error: ${err.message}`)
    throw err
}

const User = {}



const UserQr = {
    async User(parent, {email, id}) {
        try {
            const qr = {}
            if(email) qr.email = email;
            if(id) qr._id = id;
    
            let user = await UserModel.findOne(qr)
    
            if(user) {
                if(!!user.akti_contact_id === false){
                    const akti_user = await findOrCreateAktiContact(user)
    
                    return await UserModel.findOneAndUpdate(
                        qr, 
                        {akti_contact_id: akti_user.contactId}, 
                        {new: true}
                    );
                }
            }
            
            return user
        } catch (err) {
            onError(err)
        }
    }
}

const RegisterUserMttn = {
    async RegisterUser(parent, args) {
        try {
            let akti_user = await findOrCreateAktiContact(args)
            const akti_contact_id = akti_user.contactId || akti_user.data.data.contactId
            
            return await new UserModel({
                ...args, 
                akti_contact_id
            }).save()

        } catch (err) {
            onError(err)
        }
    }
}

const AuthUserQr = {
    // we suppose that the JWT is alreday parsed and set in req.user
    // as documented here: https://github.com/auth0/express-jwt
    async AuthUser(parent, agrs, {req}) {

        try {
            let user = await UserModel.findOne({_id: req.user.user_id})

            if(user) {
                return user
            } else {
                return null
            }

        } catch (err) {
            onError(err)
        }
    }
}

module.exports = {User, UserQr, RegisterUserMttn, AuthUserQr}