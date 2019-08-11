'use strict'
const logger = require('../utils/logger')
const axios = require('axios')

const token = process.env.AKTI_API_KEY
const url = 'https://my.akti.com/api/v2'

const createIntervention = async (accountId, contactId, interventionDraft) => {

    try {
        const payload = {
            "accountId": accountId,
            "interventionType": "1",
            "mainAddressId": "",
            "siteAddressId": "",
            "contactId": contactId,
            "subject": interventionDraft.subject,
            "plannedDateTimestamp": interventionDraft.plannedDateTimestamp,
            "startTime": interventionDraft.startTime,
            "duration": "01:00",
            "rate": "",
            "segmentKey": "",
            "typeKey": "",
            "sourceKey": "",
            "tasks": [
                {
                    "task": interventionDraft.requestDescription || ""
                },
                {
                    "task": interventionDraft.notes || ""
                }
            ]
        }

        const options = {
            data: payload,
            headers: {
                'token': token
            }
        }
        //console.log('options', options)
        return await axios.post(
            `${url}/intervention/interventions`,
            options
        )
    } catch (err) {
        logger.error(err.message)
    }
}

const createAccount = async accountDraft => {
    try {
        const payload = {
            "companyName": accountDraft.name,
            "vatNr": "",
            "referenceNr": "",
            "relationshipTypeKey": "",
            "accountManagerKey": "",
            "accountType": "1",
            "commercialName": accountDraft.code_name,
            "legalTypeKey": "",
            "languageKey": "",
            "sectorKey": "",
            "email": "",
            "phoneNr": "",
            "countryKey": 26,
            "isSupplier": 0,
            "isCustomer": 1,
            "contacts": [],
            "addresses": []
        }

        const options = {
            data: payload,
            headers: {
                'token': token
            }
        }

        return await axios.post(`${url}/crm/account/contacts`, options)
    } catch (err) {
        logger.error(err.message)
    }
}

const getAccountById = async (id, detailLvl = 1) => {
    try {
        const options = {
            headers: {
                'token': token
            }
        }

        return await axios.get(
            `${url}/crm/accounts?accountId=${id}&detail=${detailLvl}`,
            options
        )
    } catch (err) {
        logger.error(err.message)
    }
}

const getCompany = async (commercial_name, detailLvl = 1) => {
    try {
        const options = {
            headers: {
                'token': token
            }
        }

        return await axios.get(
            `${url}/crm/accounts?commercialName=${commercial_name}&detail=${detailLvl}`,
            options
        )

    } catch (err) {
        logger.error(err.message)
    }
}

const getContact= async email => {
    try {
        const options = {
            headers: {
                'token': token
            }
        }

        return await axios.get(
            `${url}/crm/account/contacts?email=${email}&detail=1`,
            options
        )
    } catch (err) {
        logger.error(err.message)
    }
}

const createContact = async contact_draft => {
    try {
        const payload = {
            "accountId": "407",
            "firstName": contact_draft.firstName,
            "lastName": contact_draft.lastName || 'Nolastname',
            "title": "",
            "salutationKey": "",
            "positionKey": "",
            "departmentKey": "",
            "birthDateTimestamp": "",
            "gender": "",
            "phoneNr": contact_draft.phone,
            "faxNr": "",
            "mobilePhone": contact_draft.phone,
            "email": contact_draft.email,
            "note": "",
            "languageKey": ""
        }

        const options = {
            data: payload,
            headers: {
                'token': token
            }
        }

        return await axios.post(`${url}/crm/account/contacts`, options)
    } catch (err) {
        logger.error(err.message)
    }
}

const createB2BContact = async accountDraft => {
    try {f
        const payload = {
            "companyName": `${accountDraft.first_name} ${accountDraft.last_name}`,
            "vatNr": "",
            "referenceNr": "",
            "relationshipTypeKey": "",
            "accountManagerKey": "",
            "accountType": "1",
            "commercialName": "",
            "legalTypeKey": "",
            "languageKey": "",
            "sectorKey": "",
            "email": accountDraft.email,
            "phoneNr": accountDraft.phone,
            "countryKey": 26,
            "isSupplier": 0,
            "isCustomer": 1,
            "contacts": [
                {
                    "firstName": accountDraft.first_name,
                    "lastName": accountDraft.last_name,
                    "title": "",
                    "salutationKey": "",
                    "positionKey": "",
                    "departmentKey": "",
                    "birthDateTimestamp": "",
                    "gender": "",
                    "phoneNr": accountDraft.phone,
                    "faxNr": "",
                    "mobilePhone": accountDraft.phone,
                    "email": accountDraft.email,
                    "note": "",
                    "languageKey": ""
                }
            ]
        }

        const options = {
            method: 'POST',
            uri: `${url}/crm/accounts`,
            json: true,
            body: payload,
            headers: {
                'token': token
            }
        }

        return await rp(options)
    } catch (err) {
        console.log('err', err)
        return err
    }
}

function findOrCreateAktiContact({first_name, last_name, email, phone}, callback) {
    getContact(email).then(resp => {
        let akti_user = resp.data.data[0]
        if(akti_user) {
            callback(akti_user)
        } else {
            createContact({
                firstName: first_name,
                lastName: last_name,
                email,
                phone
            }).then(resp => {
                akti_user = resp.data.data
                callback(akti_user)
            })
        }
    })
}

module.exports = {
    createContact,
    getContact,
    getCompany,
    createAccount,
    getAccountById,
    createIntervention,
    createB2BContact,
    findOrCreateAktiContact
}
