const express = require("express");
const http = require("http");
const cors = require('cors');

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

const server = http.createServer(app);

let counter = 0;

app.get('/pingpongs', (_req, res) => {
   res.send({ counter });
});

app.get('/ping', (_req, res) => {
   counter++;
   res.send(`<div>Pingpongs: ${counter}</div>`);
});

server.listen(port, () => console.log(`Server started in port ${port}`));






