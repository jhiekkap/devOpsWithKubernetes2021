const path = require('path')
const fs = require('fs');

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

const directory = path.join('/', 'mydir', 'files')
const filePath = path.join(directory, 'timehash.txt')

const start = async () => {
   await new Promise(res => fs.mkdir(directory, (err) => {
      if (err) console.log(err);
      return res()
   }));
   const timer = setInterval(() => {
      randomString = generateRandomString(40);
      timeStamp = new Date();
      const newLine = timeStamp + ': ' + randomString + '\n';
      console.log(newLine);
      fs.appendFile(filePath, newLine, function (err) {
         if (err) throw err;
         console.log('Saved!');
      });
   }, 5000);
   console.log('Generator started to write to ' + filePath);
};

start();



