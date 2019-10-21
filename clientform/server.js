const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');

const app = express();

const whitelist = ['http://localhost:6060'];
const corsOptions = {
    origin(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(serveStatic(`${__dirname}/dist`, cors(corsOptions)));
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server started ${port}`);
