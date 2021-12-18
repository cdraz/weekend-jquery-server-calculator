$(document).ready(onReady);

function onReady() {
    console.log('js and jquery ready');

    // Event handlers
        // onSubmit
    $(document).on('submit', '#calculator', onCalculate );
        // onOperator
    $(document).on('click', '.operator', onOperator );
}

// Declare global object to store numbers and operator
let calculation = {};

// Declare onCalculate function
function onCalculate(event) {
    event.preventDefault();
    
    // Check to see if operator is selected
    if (!calculation.operator) {
        console.log('no operator selected');
        alert('Please select and operator before calculating.');
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
    
    // Empty input fields
    $('#num1').val('');
    $('#num2').val('');

    

}

// Declare onOperator function
function onOperator(event) {
    event.preventDefault();

    // Change CSS to highlight current operator
    $('#operators').children().removeClass('selectedOperator');
    $(this).addClass('selectedOperator');

    // Set operator property for calculation object
    calculation.operator = $(this).val();
    console.log(calculation);
}