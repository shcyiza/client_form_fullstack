const express = require('express');
const serveStatic = require('serve-static');

const app = express();

app.use(serveStatic(`${__dirname}/dist`, {
    setHeaders: function setHeaders(res) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6060');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    },
}));
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server started cors ok? ${port}`);
