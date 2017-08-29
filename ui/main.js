//Counter code
var button = document.getElementById('counter');

button.onclick = function() {
    
    //Create a request object
    var request = new XMLhttpRequest();
    
    
    //capture the response and store it is in a variable
    request.onreadystatechange = function () {
        if (request.readystate === XMLhttprequest.DONE) {
            //Take some action
            if (request.status ===200) {
            var counter = request.responseText;
            var span = document.getElementById('count');
    span.innerHTML = counter.toString();
            }
        }
        //Not done yet
    };
    
    //make the request
    request.open('GET', 'http://http://rajatdnyate.imad.hasura-app.io/counter', true);
    request.send(null);
};