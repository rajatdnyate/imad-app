//Counter code
var button = document.getElementById('counter');

button.onclick = function() {
    
    //Create a request object
    var request = new XMLHttpRequest();
    
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function () {
        if (request.readystate === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200) {
            var counter = request.responseText;
            var span = document.getElementById('count');
    span.innerHTML = counter.toString();
            }
        }
        //Not done yet
    };
    
    //Make the request
    request.open('GET', 'http://rajatdnyate.imad.hasura-app.io/counter', true);
    request.send(null);
};

//Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var sumbit = document.getElementById('submit_btn');
submit.onclick = function() {
    //make a request to the server and same the name
    //Capture a list of names and render its as as list
    var names = ['name1','name2','name3','name4'];
    var list = '';
    for (var i=0; i< names.length; i++) {
        list += ' <li>' + names[1]+'</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
    
};