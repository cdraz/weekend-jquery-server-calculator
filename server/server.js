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

// Declare global answer variable

let answer = {};

// GET /calculator endpoint
app.get('/calculator', (req, res) => {
    console.log('in GET /calculator');
    res.send(answer);
});

// POST /calculator endpoint
app.post('/calculator', (req, res) => {
    console.log('in POST /calculator', req.body);
    
    
    // Send status 201 when complete
    res.sendStatus(201);
});




// Listen on port 5000
const port = 5000;
app.listen(port, () => {
    console.log('successfully running on port 5000');
});
