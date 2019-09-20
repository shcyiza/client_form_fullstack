const {AddressModel} = require("../../models/index");
const {onError} = require("../../utils/utils");
const logger = require("../../utils/logger");

const RegisterUserAddressMttn = {
    RegisterUserAddress(parent, args, {req}) {
        const address = new AddressModel({
            ...args,
            localisable: req.user.user_id,
            localisable_type: "User",
        });

        return address
            .save()
            .then(resp => {
                logger.info(
                    `new Address id:${args.street} Registered successfully`,
                );
                return resp;
            })
            .catch(err => {
                onError(err);
            });
    },
};

const UpdateUserAddressMttn = {
    UpdateUserAddress: function(parent, {id, ...updated}, {req}) {
        const filter = {
            _id: id,
            localisable: req.user.user_id,
        };

        return AddressModel.findOneAndUpdate(filter, {...updated}, {new: true})
            .then(address => {
                logger.info(
                    `model Address successful: ${id} Updated successfully`,
                );
                return address;
            })
            .catch(err => {
                onError(err);
            });
    },
};

module.exports = {RegisterUserAddressMttn, UpdateUserAddressMttn};
