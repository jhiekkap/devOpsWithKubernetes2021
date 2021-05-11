
const express = require("express");
const http = require("http");
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
const server = http.createServer(app);


app.get('/', (_req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(port, () => console.log(`Server started in port ${port}`));