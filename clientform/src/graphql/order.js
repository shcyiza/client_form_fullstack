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
        billing_address_id
        intervention_date
        intervention_timeframe
    }
}`;


const UPDATE_ORDER_BILLING_MTTN = `mutation ($id: String!, $address_id: String!){
    UpdateOrderBilling(id: $id, address_id: $address_id) {
        billing_address_id
    }
}`;

const CHARGE_PAYMENT_MTTN = `mutation ($token: String!, $order_id: String!){
    ChargePayment(token: $token, order_id: $order_id) {
        is_paid
        payment_ref
    }
}`;

export async function checkoutOrder(order) {
    const mutation = clientFormGraph(CHECKOUT_ORDER_MTTN);
    return mutation({ order });
}

export async function UpdateOrderBilling(id, address_id) {
    const mutation = clientFormGraph(UPDATE_ORDER_BILLING_MTTN);
    return mutation({ id, address_id });
}

export async function userOrder(id) {
    const query = clientFormGraph(USER_ORDER_QR);
    return query({ id });
}

export async function chargePayment(token, order_id) {
    const query = clientFormGraph(CHARGE_PAYMENT_MTTN);
    return query({ token, order_id });
}
