const {OrderModel} = require("../../models/index");
const {onError} = require("../../utils/utils");
const {makePaymentUrlToken, decodePaymentUrlToken} = require("../../utils/jwt");
const stripe = require("stripe")(process.env.STRIPE_SK);

const TokenizeChargeInfoQr = {
    TokenizeChargeInfo: async function(parent, {order_id}, {req}) {
        try {
            const filter = {
                _id: order_id,
                user: req.user.user_id,
            };
            const order = await OrderModel.findOne(filter);

            if (order) {
                const internal_token = makePaymentUrlToken(order_id).replace(
                    /\./g,
                    "_",
                );

                return {internal_token};
            }

            onError(new Error("No order found with the payment request!"));
        } catch (err) {
            onError(err);
        }
    },
};

const UpdateOrderPaymentInfoMttn = {
    UpdateOrderPaymentInfo: async function(parent, {order_id, payment_ref, payment_client_secret}, {req}) {
        try {
            const filter = {
                _id: order_id,
                user: req.user.user_id,
            };

            return await OrderModel.update(
                filter,
                {
                    payment_ref,
                    payment_client_secret,
                },
                {
                    new: true,
                },
            );
        } catch (err) {
            onError(err);
        }
    },
};

const DecodeTokenizeChargeInfoQr = {
    DecodeTokenizeChargeInfo: async function(
        parent,
        {payment_info_token},
        {req},
    ) {
        if (req.user.user_id) {
            const valid_jwt = payment_info_token.replace(/_/g, ".");

            return decodePaymentUrlToken(valid_jwt);
        }
    },
};

const ChargePaymentMttn = {
    ChargePayment: async function(parent, {token, order_id}, {req}) {
        try {
            const filter = {
                _id: order_id,
                user: req.user.user_id,
            };
            const order = await OrderModel.findOne(filter).populate("offer");
            const offer = order.offer;
            const amount = Math.round(
                offer.nominal_price * (1 + offer.vat) * 100,
            );

            const charge = await stripe.charges.create({
                amount,
                source: token,
                currency: "eur",
                description: `payment akti intervention id ${order.akti_intervention_id}`,
                metadata: {order_id},
            });

            const updates = {
                is_paid: true,
                payment_ref: charge.receipt_url,
            };

            await OrderModel.findOneAndUpdate(filter, updates);

            return updates;
        } catch (err) {
            onError(err);
        }
    },
};

module.exports = {
    TokenizeChargeInfoQr,
    UpdateOrderPaymentInfoMttn,
    DecodeTokenizeChargeInfoQr,
    ChargePaymentMttn,
};
