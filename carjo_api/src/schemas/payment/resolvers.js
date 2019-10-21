const {OrderModel} = require("../../models/index");
const {onError} = require("../../utils/utils");
const stripe = require("stripe")(process.env.STRIPE_SK);

const CHARGE_PAYMENT_MTTN = {
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

            return await OrderModel.findOneAndUpdate(filter, {
                is_paid: true,
                payment_ref: charge.receipt_url,
            });
        } catch (err) {
            onError(err);
        }
    },
};

module.exports = {CHARGE_PAYMENT_MTTN};
