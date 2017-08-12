//counter code
var button =document.getElementIf('counter');
button.onclick = function() {
    
    // make a request to the counter endpoint
    
    
    // configure the response and store it in a variable
    
    
    // render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementId('count');
    span.innerHTML = counter.toString();
    
};