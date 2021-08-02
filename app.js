// 2021-07-16  https://github.com/mapbox/pixelmatch


let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

// prints time in HH:MM format
const strTime = hours + ":" + minutes+ ":" + seconds;
console.log(strTime);

const express = require('express');
const app = express();
const port = 3000;
// Define the static file path
app.use(express.static(__dirname+'/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.listen(port, () => console.log('The server running on Port '+port));

