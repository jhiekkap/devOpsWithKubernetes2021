
const express = require("express");
const http = require("http");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { Client } = require('pg')

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

let dbStatus = 'DB error';

const server = http.createServer(app);

const client = new Client(
    {
        user: 'postgres', 
        password: 'secretpassword',
        host: process.env.NODE_ENV === 'production' ? 'postgres-svc' : 'localhost',
    }
);
client.connect().catch((err) => console.log(err));

const queryDb = (query, values) => client
    .query(query, values)
    .then(res => res.rows)
    .catch(e => console.error(e.stack));

const initDB = async () => {
    client.query('SELECT $1::text as message', ['DB Working'], (err, res) => {
        console.log(err ? err.stack : res.rows[0].message);
        if (!err) {
            dbStatus = res.rows[0].message;
        }
        //client.end();
    });

    client.query('CREATE TABLE IF NOT EXISTS todos (todo varchar(255));', (err, res) => {
        if (err) {
            console.log('Error creating table', err);
        } else {
            console.log('TABLE todos ok');
        };
        // client.end();
    });
    await queryDb('INSERT INTO todos (todo) VALUES ($1);', ['TODO 1']);
    await queryDb('INSERT INTO todos (todo) VALUES ($1);', ['TODO 2']);
}

const directory = path.join('/', 'mydir', 'public', 'images')
// const filePath = path.join(directory, 'image.jpg')
const filePath = 'public/images/image.jpg'

const findAFile = async () => {
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
}

const getAllTodos = async () => {
    const dbTodos = await queryDb('SELECT * FROM todos');
    return dbTodos.map(({ todo }) => todo);
}

app.get('/todos', async (_req, res) => {
    res.send(await getAllTodos());
});

app.post('/todos', async (req, res) => {
    console.log('REQ BODY', req.body);
    const { newTodo } = req.body;
    await queryDb('INSERT INTO todos (todo) VALUES ($1);', [newTodo]);
    res.send(await getAllTodos());
});

const init = async () => {
    await findAFile();

    const timer = setInterval(async () => {
        await findAFile();
    }, 24 * 60 * 60 * 1000);

    server.listen(port, () => console.log(`Server started in port ${port}`));
}

initDB();

init();


