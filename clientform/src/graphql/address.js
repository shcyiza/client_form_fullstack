import { clientFormGraph } from '../lib/graphql';

const REGISTER_USER_ADDRESS = `mutation ($street: String!, $city: String!, $zip: String!, $name: String){
    RegisterUserAddress(street: $street, city: $city, zip: $zip, name: $name){
        id
        name
        street
        city
        zip
    }
}`;

const UPDATE_USER_ADDRESS = `mutation ($id: String!, $street: String!, $city: String!, $zip: String!, $name: String){
    UpdateUserAddress(id: $id, street: $street, city: $city, zip: $zip, name: $name){
        id
        name
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
