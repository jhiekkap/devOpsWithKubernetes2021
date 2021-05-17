
const express = require("express");
const http = require("http");
const cors = require('cors');
const path = require('path')
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
const server = http.createServer(app);

const directory = path.join('/', 'mydir', 'files')
const filePath = path.join(directory, 'pingpongs.txt')
// const filePath = '../pingpongs.txt';

const getFile = async () => new Promise(res => {
   fs.readFile(filePath, (err, buffer) => {
      if (err) res(err);
      res(buffer);
   })
})

let randomString;
let timeStamp;
let pingpongs;

function generateRandomString(numberOfCharacters) {
   var randomValues = '';
   var stringValues = 'ABCDEFGHIJKLMNOabcdefghijklmnopqrstuvwxyzPQRSTUVWXYZ';
   var sizeOfCharacter = stringValues.length;
   for (var i = 0; i < numberOfCharacters; i++) {
      randomValues = randomValues + stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
   }
   return randomValues;
};

const timer = setInterval(async () => {
   randomString = generateRandomString(40);
   timeStamp = new Date().toISOString();
   pingpongs = await getFile();
   console.log(timeStamp + ': ' + randomString + '\n' + pingpongs);
}, 5000);

app.get('/', (_req, res) => {
   res.send(`<div>${timeStamp}: ${randomString}</div>${pingpongs}<div>`);
});

server.listen(port, () => console.log(`Server started in port ${port}`));




