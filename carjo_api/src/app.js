require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const logger = require("./utils/logger");

const cors = require("cors");
const Mongoose = require("mongoose");
const Redis = require("ioredis");
const {ApolloServer} = require("apollo-server-express");

let jwtMiddleware = require("express-jwt");

Mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const db = Mongoose.connection;

db.on("error", err => {
    logger.error("DB connection error!:", err);
});
db.once("open", () => {
    logger.info("DB successfully connected");
});

const redis = new Redis();

redis.on("error", err => {
    logger.error("redis connection error:", err);
});

redis.on("ready", () => {
    logger.info("redis successfully connected");
});

const app = express();

// logger middleware
morgan.token("body", req => {
    return (
        req.body &&
        JSON.stringify(req.body)
            .replace(/[{}\n]/g, "")
            .replace(/\"/g, "'")
            .replace(/\\n/g, "'")
            .replace(/[ ]{1,}/g, " ")
    );
});

app.use(
    morgan(
        "method=:method - url=:url - response-time=:response-time - graphQL-body= :body \n",
        {stream: logger.stream},
    ),
    cors({origin: "*"}),
);

const SessionManagementSchema = require("./schemas/SessionManagement");
const session_management_path = "/session_management_graph";
const session_management_api = new ApolloServer({
    schema: SessionManagementSchema,
    context: ({req, res}) => ({
        req,
        res,
        redis,
    }),
});

const ClientFormSchema = require("./schemas/ClientForm");
const client_form_path = "/client_form_graph";
const client_form_api = new ApolloServer({
    schema: ClientFormSchema,
    context: ({req, res}) => ({
        req,
        res,
    }),
});

session_management_api.applyMiddleware({
    app,
    path: session_management_path,
});

app.post(
    client_form_path,
    jwtMiddleware({secret: process.env.JWT_CLIENT_FORM_SECRET}),
    (err, req, res, next) => {
        if (err.name === "UnauthorizedError") {
            res.statusCode = 404;
            res.send({message: "Unauthorized", status: 404});
            logger.warn(
                `POST ${client_form_path} recieved Unauthorize request`,
            );
            return null;
        }
        next();
    },
);

client_form_api.applyMiddleware({
    app,
    path: client_form_path,
});

const connection_port = 6060;

app.listen(connection_port, () => {
    logger.info(
        `🚀 (Express + Apollo + Mongoose) app running at localhost:${connection_port}`,
    );
});
