
const express = require("express");
const http = require("http");
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.static('public'))

const server = http.createServer(app);

let today;

const directory = path.join('/', 'mydir', 'public', 'images')
const filePath = path.join(directory, 'image.jpg')
// const filePath = 'public/image.jpg'

const fileAlreadyExists = async () => new Promise(res => {
    fs.stat(filePath, (err, stats) => {
        if (err || !stats) {
            console.log('FILE DOESNT EXIST');
            return res(false)
        }
        console.log('FILE EXISTS');
        return res(true)
    })
})

const findAFile = async () => {
    const day = new Date().getDay();
    console.log('DAT', day, 'TODAY', today);
    if (await fileAlreadyExists() && day === today) return

    const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
    response.data.pipe(fs.createWriteStream(filePath))
    today = day;
}

app.get('/*', async (_req, res) => {
    await findAFile();
    return;
});

server.listen(port, () => console.log(`Server started in port ${port}`));
