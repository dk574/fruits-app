const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

let API_KEY = '8504ce16be3bdbed41c506c9f9ec7324';
const PORT = 5000;


app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Requests
app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
})

app.post('/', (req, res) => {
    // Sets up URL
    let { city } = req.body;
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;

    // API call
    request(URL, function (error, response, body) {
        // Checks if the call fails
        if (error) {
            res.render('index', { weather: null, error: 'Not found. Please try again.' })
            console.log(`Status code is ${response.statusCode}`);
        } else {
            // Organizes the body object, which represents our API
            let weather = JSON.parse(body);
            // Checks if weather.main is correct
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' })
                console.log(`Status code is ${response.statusCode}`);
            } else {
                let text = `${weather.name}, ${weather.sys.country}'s temperature is ${weather.main.temp} degrees.`;
                res.render('index', { weather: text, error: null })
                console.log(`Status code is ${response.statusCode}`);
            }
        }
    });
})

app.listen(PORT, () => {
    console.log(`Magic is happening on port ${PORT}!`);
})