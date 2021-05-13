
const express = require("express");
const http = require("http");
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
const server = http.createServer(app);

let counter = 0;

app.get('/', (_req, res) => {
   res.send(`<div>pong ${counter}</div>`);
   counter++;
});

server.listen(port, () => console.log(`Server started in port ${port}`));




