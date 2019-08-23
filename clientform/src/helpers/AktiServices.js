import axios from 'axios';

const BASE_URL = 'https://my.akti.com/api/v2';
const TOKEN = '4c4ca1cedbab8851fde11be3d16fb8bc';

export function fetchAktiCompany(company_name) {
  return axios.get(
    `${BASE_URL}/crm/accounts?detail=1&commercialName=${company_name}`,
    { headers: { 'Content-Type': 'application/json', token: TOKEN } },
  );
}

export function fetchAktiContact(accountId, email) {
  return axios.get(
    `${BASE_URL}/crm/account/contacts?accountId=${accountId}&email=${email}`,
    { headers: { token: TOKEN } },
  );
}
