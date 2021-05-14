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
const filePath = path.join(directory, 'pingpongs.txt')
// const filePath ='../pingpongs.txt'

let counter = 0;

app.get('/', (_req, res) => {
   const text = `Ping / Pongs: ${counter}`;
   fs.writeFile(filePath, text, (err) => {
      if (err) throw err;
      console.log('Saved!');
    });
   res.send(`<div>pong ${counter}</div>`);
   counter++;
});

const start = async () => {
   await new Promise(res => fs.mkdir(directory, (err) => {
      if (err) console.log(err);
      return res()
   }));
   server.listen(port, () => console.log(`Server started in port ${port}`));
};

start();






