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

// GET /calculator endpoint
app.get('/calculator', (req, res) => {
    console.log('in GET /calculator');
    res.send(calculation);
});

// POST /calculator endpoint
app.post('/calculator', (req, res) => {
    console.log('in POST /calculator', req.body);

    // Set calculation to received data
    calculation = req.body;

    // Call calculateAnswer function
    calculateAnswer(calculation);

    // Send status 201 when complete
    res.sendStatus(201);
});



// Declare calculateAnswer
function calculateAnswer(object) {
    // Determine operator
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
} // end calculateAnswer


// Listen on port 5000
const port = 5000;
app.listen(port, () => {
    console.log('successfully running on port 5000');
});
