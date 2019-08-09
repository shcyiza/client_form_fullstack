import { graph }  from "../lib/graphql";


const USER_BY_EMAIL = `query ($email: String!) {
    User(email: $email) {
        id
        full_name
    }
}`;

const SIGN_UP = `mutation ($full_name: String!, $email: String!, $phone: String!){
    RegisterUser(full_name: $full_name, email: $email, phone: $phone){
      id
      full_name
      email
      phone
    }
}`;

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

export function findUserByEmail(email) {
    const query = graph(USER_BY_EMAIL);
    return query({ email });
} 

export async function checkEmailExists(email) {
    const {User} = await findUserByEmail(email);
    return !!User; // Same as User !== null
}

export function registerUser(user) {
    const mutation = graph.mutate(SIGN_UP);
    return mutation({
        full_name: user.full_name,
        email: user.email,
        phone: user.phone
    });
}

export function requestToken(email) {
    const mutation = graph.mutate(REQUEST_TOKEN);
    return mutation({
        email
    });
}

export function claimToken(email, request_timestamp, claim_token) {
    const mutation = graph.mutate(CLAIM_TOKEN);
    return mutation({
        email,
        request_timestamp,
        claim_token
    });
}
