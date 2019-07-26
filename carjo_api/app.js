require('dotenv').config()
const Express = require('express')
const ExpressGraphQL = require('express-graphql')
const Mongoose = require('mongoose')

Mongoose.connect('mongodb://localhost:27017/carjoDB', { useNewUrlParser: true })
var db = Mongoose.connection
db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('successfull connection')
})

const { CarSchema } = require('./src/schemas/clientform_schema')
const app = Express()

app.use('/client_form_graph', ExpressGraphQL({
    schema: CarSchema
}))

app.listen(6060, () => {
    console.log('Listening at :6060...')
})