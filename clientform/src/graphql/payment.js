import { clientFormGraph } from '../lib/graphql';


const TOKENIZE_CHARGE_INFO_MTTN = `query ($order_id: String!){
    TokenizeChargeInfo(order_id: $order_id){
        internal_token
    }
}`;

const UPDATE_ORDER_PAYMENT_INFO_MTTN = `
mutation (
    $order_id: String!
    $payment_ref: String!
    $payment_client_secret: String!
){
    UpdateOrderPaymentInfo (
        order_id: $order_id
        payment_ref: $payment_ref
        payment_client_secret: $payment_client_secret
    ) {
        is_paid
        payment_ref
    }
}`;

const GET_CHARGE_INFO_QR = `query ($payment_ref: String!, $payment_client_secret: String!){
    GetChargeInfo(payment_client_secret: $payment_client_secret, payment_ref: $payment_ref) {
        order_id
        payment_ref
        payment_client_secret
    }
}`;

const CHARGE_PAYMENT_MTTN = `mutation ($token: String!, $order_id: String!){
    ChargePayment(token: $token, order_id: $order_id) {
        is_paid
        payment_ref
    }
}`;

export async function tokenizeInfo(order_id) {
    const query = clientFormGraph(TOKENIZE_CHARGE_INFO_MTTN);
    return query({ order_id });
}

export async function updatePaymentInfo(updates) {
    const mutation = clientFormGraph(UPDATE_ORDER_PAYMENT_INFO_MTTN);
    return mutation(updates);
}

export async function getChargeInfo(payment_info) {
    const query = clientFormGraph(GET_CHARGE_INFO_QR);
    return query(payment_info);
}

export async function chargePayment(token, order_id) {
    const mutation = clientFormGraph(CHARGE_PAYMENT_MTTN);
    return mutation({ token, order_id });
}
