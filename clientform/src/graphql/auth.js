import { userSessionGraph } from '../lib/graphql';

const REQUEST_TOKEN = `mutation ($email: String!){
    RequestUserSession(email: $email){
        status
        message
        request_timestamp
    }
}`;

const CLAIM_TOKEN = `mutation ($email: String!, $request_timestamp: String!, $claim_token: String!){
    ClaimUserSession(email: $email, request_timestamp: $request_timestamp, claim_token: $claim_token){
        status
        message
        request_timestamp
        user_session_token
    }
}`;

const LOGIN_ADMIN = `mutation ($email: String!, $pwd: String!){
    LoginAdmin(username: $email, password: $pwd){
        status
        user_session_token
    }
}`;

export function requestToken(email) {
    const mutation = userSessionGraph(REQUEST_TOKEN);
    return mutation({
        email,
    });
}

export function claimToken(email, request_timestamp, claim_token) {
    const mutation = userSessionGraph(CLAIM_TOKEN);
    return mutation({
        email,
        request_timestamp,
        claim_token,
    });
}

export function loginAdmin(email, pwd) {
    const mutation = userSessionGraph(LOGIN_ADMIN);
    return mutation({
        email,
        pwd,
    });
}
