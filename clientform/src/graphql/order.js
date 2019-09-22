import { clientFormGraph } from '../lib/graphql';

const CHECKOUT_ORDER_MTTN = `mutation ($order: OrderDraft){
    CheckoutOrder(order: $order) {
        id
    }
}`;

const USER_ORDER_QR = `query($id: String) {
    UserOrder(id: $id) {
        id
        offer {
            id
            name
            nominal_price
            vat
            description
        }
        car {
            id
            plate_number
            brand
            model
            color
        }
        address {
            id
            name
            street
            city
            zip
        }
        intervention_date
        intervention_timeframe
        akti_intervention_id
    }
}`;

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

export async function userOrder(id) {
    const query = clientFormGraph(USER_ORDER_QR);
    return query({ id });
}
