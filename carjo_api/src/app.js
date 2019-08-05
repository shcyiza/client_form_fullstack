require('dotenv').config()
const Express = require('express')
const morgan = require('morgan')
const logger = require('./utils/logger')

const cors = require('cors')
const Mongoose = require('mongoose')
const Redis = require("ioredis");
const { ApolloServer } = require('apollo-server-express')

Mongoose.connect(process.env.DB_HOST,{
    useNewUrlParser: true,
    useCreateIndex: true
})

const db = Mongoose.connection
db.on('error', function(err) {
    logger.error('DB connection error!:', err)
})
db.once('open', function() {
    logger.info('DB successfully connected')
})

const redis = new Redis();

redis.on("error", function (err) {
    logger.error('redis connection error:', err);
});

redis.on("ready", function (err) {
    logger.info("redis successfully connected");
});

const app = Express();

// logger middleware
morgan.token('body', function (req, res) {
    return JSON.stringify(
        req.body.query
        .replace(/[{}\n]/g, "")
        .replace(/\"/g, "'")
        .replace(/[ ]{2,}/g, " ")
    )
});

app.use(morgan(
    'method=:method - url=:url - response-time=:response-time - graphQL-body= :body',
    { stream: logger.stream }
))

const ClientFormSchema = require('./schemas/ClientForm')
const client_form_path = '/client_form_graph'
const client_form_api = new ApolloServer({
    schema: ClientFormSchema,
    context: ({req, res}) => ({
        req,
        res,
        redis,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
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

