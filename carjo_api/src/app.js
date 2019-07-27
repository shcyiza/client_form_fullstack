/*eslint no-console: "error"*/
require('dotenv').config()
const Express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')

Mongoose.connect('mongodb://localhost:27017/carjoDB', { useNewUrlParser: true })
var db = Mongoose.connection
db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('successfull connection')
})

const app = Express()

const ClientFormSchema = require('./schemas/clientform_schema/index')
const server = new ApolloServer({ schema: ClientFormSchema })
const client_form_path = '/client_form_graph'

app.post(client_form_path,
    cors({origin: '*', credentials: true})
)

server.applyMiddleware({ app, path: client_form_path })

app.listen(6060, () => {
    console.log('Listening at :6060...')
})