
const express = require("express");
const http = require("http");
const cors = require('cors');
const axios = require('axios');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
const server = http.createServer(app);

function generateRandomString(numberOfCharacters) {
   var randomValues = '';
   var stringValues = 'ABCDEFGHIJKLMNOabcdefghijklmnopqrstuvwxyzPQRSTUVWXYZ';
   var sizeOfCharacter = stringValues.length;
   for (var i = 0; i < numberOfCharacters; i++) {
      randomValues = randomValues + stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
   }
   return randomValues;
};

let randomString = generateRandomString(40);
let timeStamp = new Date().toISOString();
let pingpongs = 0;

const timer = setInterval(async () => {
   randomString = generateRandomString(40);
   timeStamp = new Date().toISOString();
   console.log(timeStamp + ': ' + randomString + '\n' + pingpongs);
}, 5000);

app.get('/', async (_req, res) => {
   try {
      pingpongs = await axios.get('http://localhost:3001/pingpongs');
      console.log('PINGPONGS', pingpongs.data);
      res.send(`<div>${timeStamp}: ${randomString}</div>Ping / Pongs: ${pingpongs.data.counter}<div>`);
   } catch (err) {
      console.log('Pingpong error: ', err);
      res.send('<div>Pingpong error</div>')
   }

});

server.listen(port, () => console.log(`Server started in port ${port}`));




