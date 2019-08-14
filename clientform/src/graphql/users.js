import { graph }  from "../lib/graphql";


const USER_BY_EMAIL = `query ($email: String!) {
    User(email: $email) {
        id
        first_name
        last_name
    }
}`;

const SIGN_UP = `mutation ($first_name: String!, $last_name: String!, $email: String!, $phone: String!){
    RegisterUser(first_name: $first_name, last_name: $last_name, email: $email, phone: $phone){
        id
        first_name
        last_name
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

export async function registerUser(user) {
    const {first_name, last_name, email, phone} = user
    const mutation = graph(SIGN_UP);
    return mutation({
        first_name,
        last_name,
        email,
        phone
    });
}

export async function requestToken(email) {
    const mutation = graph(REQUEST_TOKEN);
    return mutation({
        email
    });
}

export async function claimToken(email, request_timestamp, claim_token) {
    try {
        const mutation = await graph(CLAIM_TOKEN);
        return mutation({
            email,
            request_timestamp,
            claim_token
        });
    } catch (err) {
        alert(err.message)
    }
}
