import { userSessionGraph, clientFormGraph } from '../lib/graphql';


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

const AUTHED_USER = `query {
    AuthUser {
        id
        first_name
        last_name
        email
        phone
        cars {
            id
            plate_number
            brand
            model
            color 
        }
        addresses {
            id
            street
            city
            zip
        }
    }
}`;

export function findUserByEmail(email) {
  const query = userSessionGraph(USER_BY_EMAIL);
  return query({ email });
}

export async function checkEmailExists(email) {
  const { User } = await findUserByEmail(email);
  return !!User; // Same as User !== null
}

export async function registerUser(user) {
  const mutation = userSessionGraph(SIGN_UP);
  return mutation(user);
}

export function authedUser() {
  const query = clientFormGraph(AUTHED_USER);
  return query();
}
