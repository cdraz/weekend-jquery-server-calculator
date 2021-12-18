// require express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// declare express app
const app = express();

// Serve static files using express
app.use(express.static('server/public'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());









// Listen on port 5000
const port = 5000;
app.listen(port, () => {
    console.log('successfully running on port 5000');
});
