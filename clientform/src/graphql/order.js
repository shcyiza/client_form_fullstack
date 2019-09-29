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
    }
}`;

export async function checkoutOrder(order) {
    const mutation = clientFormGraph(CHECKOUT_ORDER_MTTN);
    return mutation({ order });
}

export async function userOrder(id) {
    const query = clientFormGraph(USER_ORDER_QR);
    return query({ id });
}
