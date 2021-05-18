
const express = require("express");
const http = require("http");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

const server = http.createServer(app);

let todos = [
    'TODO 1',
    'TODO 2',
];

const directory = path.join('/', 'mydir', 'public', 'images')
// const filePath = path.join(directory, 'image.jpg')
const filePath = 'public/images/image.jpg'

const findAFile = async () => {
    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
}

app.get('/todos', async (_req, res) => {
    res.send(todos);
});

app.post('/todos', async (req, res) => {
    console.log('REQ BODY', req.body);
    const { newTodo } = req.body;
    todos = todos.concat(newTodo);
    res.send(todos);
});

const init = async () => {
    await findAFile();

    const timer = setInterval(async () => {
        await findAFile();
    }, 24 * 60 * 60 * 1000);

    server.listen(port, () => console.log(`Server started in port ${port}`));
}

init();


