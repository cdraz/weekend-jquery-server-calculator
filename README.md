# Server Calculator

## Description

For this assignment, I was tasked with creating a calculator that takes in the inputs for the calculation on the client side, completes the mathematical operation on the server side, stores a history of the calculations on the server, and sends the solution and history back to the client.

To complete this task, I used Express to build out the server, and jQuery to build out the client. The inputs are taken in through jQuery functions and sent to the server as an object through an AJAX POST request. There, the object is received through the corresponding POST endpoint, the math is completed, and a new object is created. The client then makes an AJAX GET request and the new object is sent to the client via the corresponding GET endpoint, and is then rendered to the DOM.
