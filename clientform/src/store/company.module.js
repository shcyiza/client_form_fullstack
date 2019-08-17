import {fetchAktiCompany} from "../helpers/AktiServices"

// initial state
const state = {
    companyName: "",
    vatNr: "",
    vat: "",
    addresses: []
}

// getters
const getters = {
    getCompanyDetails: state => ({
        id: state.accountId,
        name: state.companyName,
        vat_number: state.vatNr,
        vat_rate: state.vat
    }),
    getCompanySites: state => state.addresses.map(site => ({
            id: site.addressId,
            street: site.streetAddress,
            city: site.city,
            zip_code: site.zip
        })
    )
}

// actions
const actions = {
    fetchCompany(context, company_code) {
        fetchAktiCompany(company_code).then(({data}) => {
            if (data.data[0]) {
                context.commit("setCompany", data.data[0])
                // eslint-disable-next-line no-console
                console.log("company was fetch successfully")
            } else {
                // eslint-disable-next-line no-console
                console.log(`no result for ${company_code} company`)
            }
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.log("company fetch was unsuccessful", err)
            throw err
        })
    },
    initCompanyData({state, dispatch}, company_code) {
        if (company_code && !state.accountId) {
            dispatch("fetchCompany", company_code)
        }
    }
}

// mutations
const mutations = {
    setCompany(state, {accountId, companyName, vatNr, vat, addresses}) {
        state.accountId = accountId
        state.companyName = companyName
        state.vatNr = vatNr
        state.vat = vat
        state.addresses = addresses
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
