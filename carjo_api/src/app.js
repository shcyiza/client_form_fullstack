require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const cors = require("cors");
const mongoConfig = require("./config/mongoConfig");
const redisConfig = require("./config/redisConfig");
const apolloConfig = require("./config/apolloConfig");
const security = require("./config/securityConfig");
const requestLog = require("./config/requestLoggingConfig");

mongoConfig.connect();
const redis = redisConfig.connect();

const app = express();

app.use(requestLog.getMiddleware(), cors({origin: "*"}));

const apollo = apolloConfig.connect(app, redis);

apollo.session_management.applyMiddleware(app);
// Secure the client_form with JWT
// depend of oder of injection of other midelware :-(
app.post(
    apollo.client_form.path,
    security.jwtFilter,
    security.authenticationErrorFilter(apollo.client_form.path),
);
apollo.client_form.applyMiddleware(app);

const connection_port = 6060;

app.listen(connection_port, () => {
    logger.info(
        `🚀 (Express + Apollo + Mongoose) app running at localhost:${connection_port}`,
    );
});
