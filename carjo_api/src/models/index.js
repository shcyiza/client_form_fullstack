const Mongoose = require("mongoose");

const UserModel = Mongoose.model(
    "User",
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String, index: true, unique: true, required: true},
        phone: {type: String, index: true, unique: true, required: true},
        akti_contact_id: {type: String, index: true, sparse: true},
    },
    "user",
);

const CarModel = Mongoose.model(
    "Car",
    {
        user: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        plate_number: {type: String, index: true, unique: true, required: true},
        brand: {type: String, required: true},
        model: {type: String, required: true},
        color: {type: String, required: true},
    },
    "car",
);

const CompanyModel = Mongoose.model(
    "Company",
    {
        name: {type: String, required: true},
        vat_number: {type: String, required: true},
        email: String,
        phone: String,
        first_color: String,
        second_color: String,
        third_color: String,
        web_site: String,
        logo_url: String,
        code_name: {
            type: String,
            index: true,
            unique: true,
            required: true,
        },
        akti_account_id: {
            type: String,
            index: true,
            sparse: true,
        },
    },
    "company",
);

const AddressModel = Mongoose.model(
    "Address",
    {
        localisable: {
            type: Mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "localisable",
        },
        localisable_type: {
            type: String,
            required: true,
            enum: ["User", "Company"],
        },
        street: {type: String, required: true},
        city: {type: String, required: true},
        zip: {type: String, required: true},
        name: {type: String},
        akti_address_id: {type: String, index: true, sparse: true},
    },
    "address",
);

const UserMethods = {
    errorOnNoUserFound(user, query_attr) {
        if (user === null) {
            throw new Error(`No user not found with ${query_attr}`);
        }
    },
};

module.exports = {UserModel, CarModel, UserMethods, CompanyModel, AddressModel};
