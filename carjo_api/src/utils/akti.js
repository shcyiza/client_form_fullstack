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
            "accountId": contact_draft.accountId ||"",
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
    try {
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
            "phoneNr": accountDraft.firstPhoneNumber,
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
            ],
            "addresses": [
                {
                    "isBilling": 1,
                    "isPrimary": 1,
                    "isDelivery": 1,
                    "isSite": 1,
                    "countryKey": 26,
                    "streetAddress": accountDraft.address,
                    "city": accountDraft.city,
                    "zip": accountDraft.zip
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

module.exports = { createContact, getContact, getCompany, createAccount, getAccountById, createIntervention, createB2BContact }
