'use strict'
const logger = require('../utils/logger')
const axios = require('axios')

const token = process.env.AKTI_API_KEY
const url = 'https://my.akti.com/api/v2'

function akti(method, path, data=undefined) {
    return axios({
        method,
        url: url + path,
        data,
        headers: {
            'token': token
        }
    })
}

const createIntervention = (accountId, contactId, interventionDraft) => {

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

        //console.log('options', options)
        return akti( 'post', `/intervention/interventions`, payload )
    } catch (err) {
        logger.error(err.message)
        throw err
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

        return akti( 'post', '/crm/account/contacts', payload )
    } catch (err) {
        logger.error(err.message)
        throw err
    }
}

const getAccountById = async (id, detailLvl = 1) => {
    try {
        return akti( 'get', `/crm/accounts?accountId=${id}&detail=${detailLvl}`)

    } catch (err) {
        logger.error(err.message)
        throw err
    }
}

const getCompany = async (commercial_name, detailLvl = 1) => {
    try {
        return akti( 'get', `/crm/accounts?commercialName=${commercial_name}&detail=${detailLvl}`)
    } catch (err) {
        logger.error(err.message)
        throw err
    }
}

const getContact= async email => {
    try {
        return akti( 'get', `/crm/account/contacts?email=${email}&detail=1`)
    } catch (err) {
        logger.error(err.message)
        throw err
    }
}

const createContact = contact_draft => {
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

        return akti( 'post', '/crm/account/contacts', payload )
    } catch (err) {
        logger.error(err.message)
        throw err
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

        return akti( 'post', '/crm/accounts', payload )

    } catch (err) {
        logger.error(err.message)
        throw err
    }
}

function findOrCreateAktiContact({first_name, last_name, email, phone}, callback) {
    return getContact(email).then(resp => {
        let akti_user = resp.data.data[0]
        if(akti_user) {
            logger.info(`user ${email} found in AKTI`)
            return akti_user
        } else {
            logger.info(`user ${email} will be created created in AKTI`)
            return createContact({
                firstName: first_name,
                lastName: last_name,
                email,
                phone
            })
        }
    }).catch(err => {
        logger.error(err.message)
        throw err
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
