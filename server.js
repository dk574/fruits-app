const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


let API_KEY = '8504ce16be3bdbed41c506c9f9ec7324';
const app = express();
const PORT = 5000;

let API_KEY = '8504ce16be3bdbed41c506c9f9ec7324';

app.use(express.static('/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    let { city } = req.body;
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;

    request(URL, function (error, response, body) {
        if (error) {
            res.render('index', { weather: null, error: 'Not found. Please try again.' })
        } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again.' })
            }
            let text = `${weather.name}, ${weather.sys.country}'s weather is ${weather.main.temp}`;
            res.render('index', { weather: text, error: null })
        }
    });
})

app.listen(PORT, () => {
    console.log(`Magic is happening on port ${PORT}!`);
})