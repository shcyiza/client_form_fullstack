const {OrderModel} = require("../../models/index");
const logger = require("../../utils/logger");
const {onError} = require("../../utils/utils");

const Order = {};

const OrdersQr = {
    Orders(parent, {page}) {
        return OrderModel.find()
            .limit(15)
            .skip(15 * (page || 1))
            .exec();
    },
};

const UserOrdersQr = {
    UserOrders(parent, args, {req}) {
        const {user, page} = args;
        const filter = {};

        if (req.user && req.user.user_id) {
            filter.user = req.user.user_id;
        }

        if (!filter.user && user) {
            filter.user = user;
        }

        return OrderModel.find({user})
            .limit(15)
            .skip(15 * (page || 1))
            .exec();
    },
};

const UserOrderQr = {
    UserOrder(parent, args, {req}) {
        const {user, id} = args;
        const filter = {user};

        if (req.user && req.user.user_id) {
            filter.user = req.user.user_id;
        }

        if (id) {
            filter._id = id;
        }

        if (!filter.user && user) {
            filter.user = user;
        }

        return OrderModel.findOne(filter).exec();
    },
};

const CheckoutOrderMttn = {
    CheckoutOrder(parent, {order}, {req}) {
        order.user = req.user.user_id;
        const new_order = new OrderModel(order);

        return new_order
            .save()
            .then(resp => {
                logger.info(`new Order id: ${resp.id} Registered successfully`);
                return resp;
            })
            .catch(err => {
                onError(err);
            });
    },
};

module.exports = {
    Order,
    OrdersQr,
    UserOrderQr,
    UserOrdersQr,
    CheckoutOrderMttn,
};
