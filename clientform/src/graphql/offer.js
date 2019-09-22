import { clientFormGraph } from '../lib/graphql';

const OFFERS = `query{
    Offers {
        id
        name
        nominal_price
        vat
        description
    }
}`;



// eslint-disable-next-line import/prefer-default-export
export async function fetchOffers() {
    const query = clientFormGraph(OFFERS);
    return query();
}
