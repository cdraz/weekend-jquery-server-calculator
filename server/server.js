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

let calculation;
let history = [];

// GET /calculator endpoint
app.get('/calculator', (req, res) => {
    console.log('in GET /calculator, sending', calculation);
    res.send(calculation);
});

// POST /calculator endpoint
app.post('/calculator', (req, res) => {
    console.log('in POST /calculator', req.body);

    // Set calculation to received data
    calculation = {
        num1: Number(req.body.num1),
        num2: Number(req.body.num2),
        operator: req.body.operator
    }

    // Call calculateAnswer function
    calculateAnswer(calculation);

    // Send status 201 when complete
    res.sendStatus(201);
});

// GET /history endpoint
app.get('/history', (req, res) => {
    console.log('in GET /history, sending', history);
    res.send(history);
});

// No POST /history endpoint needed -- client cannot modify history

// Declare calculateAnswer
function calculateAnswer(object) {
    // Determine operator and calculate answer
    if (object.operator === '+') {
        calculation.answer = object.num1 + object.num2;
    }
    if (object.operator === '-') {
        calculation.answer = object.num1 - object.num2;
    }
    if (object.operator === '*') {
        calculation.answer = object.num1 * object.num2;
    }
    if (object.operator === '/') {
        calculation.answer = object.num1 / object.num2;
    }
    // Push calculation object to calculation history array
    history.push(calculation);

} // end calculateAnswer


// Listen on port 5000
const port = 5000;
app.listen(port, () => {
    console.log('successfully running on port 5000');
});
