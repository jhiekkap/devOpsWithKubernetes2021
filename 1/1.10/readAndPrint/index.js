const express = require("express");
const http = require("http");
const cors = require('cors');
const path = require('path')
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
const server = http.createServer(app);

const directory = path.join('/', 'mydir', 'files')
const filePath = path.join(directory, 'timehash.txt')

const getFile = async () => new Promise(res => {
   fs.readFile(filePath, (err, buffer) => {
      if (err) res(err);
      res(buffer);
   })
})

app.get('/', async (_req, res) => {
   const file = await getFile();
   res.send(`<div>${file}</div>`);
});

server.listen(port, () => console.log(`Server started in port ${port}`));





