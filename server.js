const express = require('express');
const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hey there!')
})

app.listen(PORT, () => {
    console.log(`Magic is happening on port ${PORT}!`);
})