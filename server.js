var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'rajatdnyate',
    database: 'rajatdnyate',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password:process.env. DB_PASSWORD
    
};
var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article One! Rajat Dnyate',
        heading: 'Article One',
        date: 'August 21, 2017',
        content: `
       <p> Electromania is a group of 5 engineering students. studying in final year of engineering of electrical and electronics engineering in MIT aurangabad.
            </p>
            <p>
                Electromania is a group of 5 engineering students. studying in final year of engineering of electrical and electronics engineering in MIT aurangabad.
            </p>
            <p>
                 Electromania is a group of 5 engineering students. studying in final year of engineering of electrical and electronics engineering in MIT aurangabad.
            </p>`
    }
};


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

 var counter = 0;
app.get('/counter', function (req, res) {
     counter = counter + 1;
     res.send(counter.toString());
 });
 
app.get('/Electromania', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'Electromania.html')); });


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

var pool = new Pool(config);
app.get('/test-db', function (req,res) {
    //make a select request
    //Get the name from the results
    pool.query('SELECT * FROM test', function(err,result) {
        if (err) {
        res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
    });
    
    app.get('/articles/:Electromania', function (req ,res) {
        //articleName == article-one
        // articles[articleName] =={} content for article one
    // SELECT  * FROM article WHERE title = 'article-one'
    pool.query("SELECT * FROM article WHERE title = '"+ req.params.Electromania + "'", function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(404).send('Article not found');
            } else {
               var articleDATA = result.rows[0];
        res.send(createTemplate(articleData));
            }
            }
        });
        });
        
