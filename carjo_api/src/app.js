require('dotenv').config()
const Express = require('express')
const morgan = require('morgan')
const logger = require('./utils/logger')

const cors = require('cors')
const Mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')

Mongoose.connect('mongodb://localhost:27017/carjoDB',{
    useNewUrlParser: true,
    useCreateIndex: true
})

var db = Mongoose.connection
db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('successfull connection')
})

const app = Express()

//logger
morgan.token('body', function (req, res) { return JSON.stringify(req.body.query.replace(/[{}\n]/g, "").replace(/\"/g, "'")) });
app.use(morgan(
    'method=:method -  url=:url - '
    + '- response-time=:response-time - '
    + 'graphQL-body= :body'
    , { stream: logger.stream }
))

const ClientFormSchema = require('./schemas/clientform_schema/index')
const client_form_api = new ApolloServer({ schema: ClientFormSchema })
const client_form_path = '/client_form_graph'



app.post(client_form_path,
    cors({origin: '*'})
)

client_form_api.applyMiddleware({
    app,
    path: client_form_path,
    formatError: (err) => {
        if (err.message.startsWith("Database Error: ")) {
          return new Error('Internal server error');
        }
        
        return err
    }
})

const connection_port = 6060
app.listen(connection_port, () => {
    logger.info(`🚀 (Express + Apollo + Mongoose) app running at localhost:${connection_port}`)
})