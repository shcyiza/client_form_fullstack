import { userSessionGraph, clientFormGraph } from '../lib/graphql';

const COMPANY_BY_CODE_NAME = `query ($code_name: String!) {
    Company(code_name: $code_name) {
        id
        name
        code_name
        first_color
        second_color
        third_color
        vat_number
        addresses {
            name
            id
            street
            city
            zip
        }
    }
}`;

export async function fetchCompany(code_name) {
    const query = userSessionGraph(COMPANY_BY_CODE_NAME);
    return query({ code_name });
}