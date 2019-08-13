const {UserModel} = require('../../models/index')
const logger = require('../../utils/logger')
const {findOrCreateAktiContact} = require('../../utils/akti')

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
            logger.error("model User error:" + err.message)
            throw err
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
            logger.error("model User error:" + err.message)
            throw err
        }
    }
}

module.exports = {User, UserQr, RegisterUserMttn}