//Counter code
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function() {
    
    //Make a reqest to the counter endpoint
    
    //capture the response and store it is in a variable
    
    //Render the variable in the correct span
    counter = counter+1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};