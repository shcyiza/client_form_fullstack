import { userSessionGraph } from '../lib/graphql';

const COMPANY_BY_CODE_NAME = `query ($code_name: String!) {
    Company(code_name: $code_name) {
        id
        name
        code_name
        first_color
        second_color
        third_color
        vat_number
        account_id,
        addresses {
            name
            id
            street
            city
            zip
        }
        offers {
            id
            name
            nominal_price
            vat
            description
        }
    }
}`;

// eslint-disable-next-line import/prefer-default-export
export async function fetchCompany(code_name) {
    const query = userSessionGraph(COMPANY_BY_CODE_NAME);
    return query({ code_name });
}
