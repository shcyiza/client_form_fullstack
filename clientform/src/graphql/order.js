import { clientFormGraph } from '../lib/graphql';

const CHECKOUT_ORDER_MTTN = `mutation ($order: OrderDraft){
    CheckoutOrder(order: $order) {
        id
    }
}`;

// eslint-disable-next-line import/prefer-default-export
export async function checkoutOrder(order_draft) {
    const order = {
        offer: order_draft.offer_id,
        car: order_draft.car_id,
        address: order_draft.address_id,
        intervention_date: order_draft.intervention_date,
        intervention_timeframe: order_draft.intervention_timeframe,
    };
    const mutation = clientFormGraph(CHECKOUT_ORDER_MTTN);
    return mutation({ order });
}
