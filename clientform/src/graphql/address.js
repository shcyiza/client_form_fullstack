import { clientFormGraph } from '../lib/graphql';

const REGISTER_USER_ADDRESS = `mutation ($street: String!, $city: String!, $zip: String!){
    RegisterUserAddress(street: $street, city: $city, zip: $zip){
        id
        street
        city
        zip
    }
}`;

const UPDATE_USER_ADDRESS = `mutation ($id: String!, $street: String!, $city: String!, $zip: String!){
    UpdateUserAddress(id: $id, street: $street, city: $city, zip: $zip){
        id
        street
        city
        zip
    }
}`;

export function registerAddress(address) {
  const mutation = clientFormGraph(REGISTER_USER_ADDRESS);
  return mutation(address);
}

export function updateAddress(address) {
  const mutation = clientFormGraph(UPDATE_USER_ADDRESS);
  return mutation(address);
}
