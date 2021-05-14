function generateRandomString(numberOfCharacters) {
   var randomValues = '';
   var stringValues = 'ABCDEFGHIJKLMNOabcdefghijklmnopqrstuvwxyzPQRSTUVWXYZ';
   var sizeOfCharacter = stringValues.length;
   for (var i = 0; i < numberOfCharacters; i++) {
      randomValues = randomValues + stringValues.charAt(Math.floor(Math.random() * sizeOfCharacter));
   }
   return randomValues;
};

setInterval(() => {
   const randomString = generateRandomString(40);
   const timeStamp = new Date();
   console.log(timeStamp + ': ' + randomString);
}, 5000);



