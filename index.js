const request = require('request');

let API_KEY = '8504ce16be3bdbed41c506c9f9ec7324';
let city = 'accra';
let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

request(URL, function(error, response, body) {
    if (error) {
        console.log(`error: ${error}`);
    } else {
        let weather = JSON.parse(body);
        // console.log(`body: ${body}`);
        console.log(`${weather.name}, ${weather.sys.country}'s weather is ${weather.main.temp}`)
    }
});