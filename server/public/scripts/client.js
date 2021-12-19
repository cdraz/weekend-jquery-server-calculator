$(document).ready(onReady);

function onReady() {
    console.log('js and jquery ready');

    // Event handlers
        // onSubmit
    $(document).on('submit', '#calculator', onCalculate );
        // onOperator
    $(document).on('click', '.operator', onOperator );
        // onClear
    $(document).on('click', '#clear', clearCalculator );

    refresh();
}

// Declare global object to store numbers and operator
let calculation = {};

// Declare onCalculate function
function onCalculate(event) {
    event.preventDefault();
    
    // Check to see if operator is selected
    if (!calculation.operator) {
        console.log('no operator selected');
        alert('Please select an operator before calculating.');
        return;
    }

    // Check to see if input fields are numbers
    if ( $('#num1').val() === '' || $('#num2').val() === '' || isNaN(Number($('#num1').val())) || isNaN(Number($('#num2').val())) ) {
        console.log('inputs not numbers');
        alert('Please ensure that inputs are numbers.');
        return;
    }

    // Pull num1 and num2 from input fields
    calculation.num1 = $('#num1').val();
    calculation.num2 = $('#num2').val();
    console.log('input numbers', calculation.num1, calculation.num2);

    // Send calculation to server
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: calculation
    })
        .then( res => {
            console.log('POST response', res );
        })


    // Refresh DOM
    refresh();

    // Reset calculator
    clearCalculator();

} // end onCalculate

// Declare onOperator function
function onOperator(event) {
    event.preventDefault();

    // Change CSS to highlight current operator
    $('#operators').children().removeClass('selectedOperator');
    $(this).addClass('selectedOperator');

    // Set operator property for calculation object
    calculation.operator = $(this).val();
    console.log(calculation);

} // end onOperator

// Declare clearCalculator function
function clearCalculator() {
    // Input reset, operator visual reset
    $('#num1').val('');
    $('#num2').val('');
    $('#operators').children().removeClass('selectedOperator');

    // Reset calculation
    calculation = {};

} // end clearCalculator

// Declare refresh function
function refresh() {

    // Get solution from server
        $.ajax({
            method: 'GET',
            url: '/calculator'
        })
            .then( res => {
                console.log('AJAX request complete', res );
                renderAnswer(res);
            })
    // Get history from server
        $.ajax({
            method: 'GET',
            url: '/history'
        })
            .then( res => {
                console.log('AJAX request complete', res);
                renderHistory(res);
            })

} // end refresh

// Declare renderHistory function
function renderHistory(object) {

    // Clear previous histry
    $('#history').empty();

    // Show history on DOM
    for (let pastCalc of object) {
    $('#history').append(`
        <li>
            ${pastCalc.num1} ${pastCalc.operator} ${pastCalc.num2} = ${pastCalc.answer}
        </li>
    `);
    }

} // end renderHistory

// Declare renderAnswer
function renderAnswer(object) {
    // Show solution to current calculation on DOM
    $('#answer').html(object.answer);

}// end renderAnswer