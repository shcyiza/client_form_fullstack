require('dotenv').config()
const Express = require('express')
const morgan = require('morgan')
const logger = require('./utils/logger')

const cors = require('cors')
const Mongoose = require('mongoose')
const Redis = require("redis");
const { ApolloServer } = require('apollo-server-express')

Mongoose.connect('mongodb://localhost:27017/carjoDB',{
    useNewUrlParser: true,
    useCreateIndex: true
})

var db = Mongoose.connection
db.on('error', () => {
    logger.error('DB error!')
})
db.once('open', () => {
    logger.info('DB successfully connected')
})

redis_client = Redis.createClient();

redis_client.on("error", function (err) {
    logger.error( err);
});

const app = Express();

//logger
morgan.token('body', function (req, res) { return JSON.stringify(req.body.query.replace(/[{}\n]/g, "").replace(/\"/g, "'")) });
app.use(morgan(
    'method=:method - url=:url - response-time=:response-time - graphQL-body= :body',
    { stream: logger.stream }
))

const ClientFormSchema = require('./schemas/clientform_schema/index')
const client_form_path = '/client_form_graph'
const client_form_api = new ApolloServer({
    schema: ClientFormSchema,
    context: ({req, res}) => ({
        req,
        res,
        redis_client,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    })
})




app.post(client_form_path,
    cors({origin: '*'})
)

client_form_api.applyMiddleware({
    app,
    path: client_form_path
})

const connection_port = 6060
app.listen(connection_port, () => {
    logger.info(`🚀 (Express + Apollo + Mongoose) app running at localhost:${connection_port}`)
})