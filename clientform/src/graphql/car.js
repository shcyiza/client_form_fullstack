import { clientFormGraph } from '../lib/graphql';

const REGISTER_CAR = `mutation ($plate_number: String!, $brand: String!, $model: String!, $color: String!){
    RegisterCar(plate_number: $plate_number, brand: $brand, model: $model, color: $color){
            id
            plate_number
            brand
            model
            color
    }
}`;

export function registerCar(car) {
    const mutation = clientFormGraph(REGISTER_CAR);
    return mutation(car);
}
