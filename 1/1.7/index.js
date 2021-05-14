
const express = require("express");
const http = require("http");
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
const server = http.createServer(app);

let randomString;
let timeStamp;

function generateRandomString(numberOfCharacters) {
    var randomValues = '';
    var stringValues = 'ABCDEFGHIJKLMNOabcdefghijklmnopqrstuvwxyzPQRSTUVWXYZ';
    var sizeOfCharacter = stringValues.length;
    for (var i = 0; i < numberOfCharacters; i++) {
       randomValues = randomValues + stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
    }
    return randomValues;
 };
 
 const timer = setInterval(() => {
    randomString = generateRandomString(40);
    timeStamp = new Date();
    console.log(timeStamp + ': ' + randomString);
 }, 5000);

app.get('/', (_req, res) => {
    res.send(`<div>Time: ${timeStamp}</div><div>Hash: ${randomString}</div>`);
});

server.listen(port, () => console.log(`Server started in port ${port}`));




 