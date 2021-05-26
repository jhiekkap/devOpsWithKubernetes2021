const express = require("express");
const http = require("http");
const cors = require('cors');
const { Client } = require('pg')

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());

let dbStatus = 'DB error';

const client = new Client(
   {
      user: 'postgres',
      // database: 'mydb',
      password: 'secretpassword',
      host: process.env.NODE_ENV === 'production' ? 'postgres-svc' : 'localhost',
   }
);
client.connect().catch((err) => console.log(err));

const server = http.createServer(app);

let counter = 0;

const queryDb = (query, values) => {
   // client.connect().catch((err) => console.log(err));
   client.query(query, values, (err, res) => {
      console.log(err ?? 'DB query ok');
      // client.end();
      return res;
   });
};

const initDB = () => {
   client.query('SELECT $1::text as message', ['DB Working'], (err, res) => {
      console.log(err ? err.stack : res.rows[0].message);
      if (!err) {
         dbStatus = res.rows[0].message;
      }
      //client.end();
   });

   client.query('CREATE TABLE IF NOT EXISTS Pingpongs (action varchar(255), counter int);', (err, res) => {
      if (err) {
         console.log('Error creating table', err);
      } else {
         console.log('TABLE Pingpongs ok');
      };
      // client.end();
   });
   queryDb('INSERT INTO Pingpongs (action, counter) VALUES ($1, $2);', ['pings', 0])
}

app.get('/', (_req, res) => {
   res.send('<div>Hellouta</div>');
});

app.get('/pingpongs', (_req, res) => {
   res.send({ counter });
});

app.get('/ping', (_req, res) => {
   counter++;
   queryDb(`UPDATE Pingpongs SET counter=${counter} WHERE action='pings'`)
   res.send(`<div>Pingpongs: ${counter}</div><div>${dbStatus}</div>`);
});

app.get('/droptable', (_req, res) => {
   queryDb('DROP TABLE Pingpongs'); 
   res.send('ok');
});

app.get('/init', (_req, res) => {
   initDB();
   res.send('ok');
});

initDB();

server.listen(port, () => console.log(`Server started in port ${port}`));








