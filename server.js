var express = require('express');
 var morgan = require('morgan');
 var path = require('path');
 var Pool = require('pg').Pool;
 var crypto = require('crypto');
 var bodyParser = require('body-parser');
 var session = require('express-session');
 
 var config = {
     user: 'rajatdnyate',
     database: 'rajatdnyate',
     host: 'db.imad.hasura-app.io',
     port: '5432',
     password: process.env.DB_PASSWORD
 };
 
 var app = express();
 
 
 function createTemplate (data) {
     var title = data.title;
     var date = data.date;
     var heading = data.heading;
     var content = data.content;
     
     var htmlTemplate = `
     <html>
       <head>
           <title>
               ${title}
           </title>
           <meta name="viewport" content="width=device-width, initial-scale=1" />
           <link href="/ui/style.css" rel="stylesheet" />
       </head> 
       <body>
           <div class="container">
               <div>
                   <a href="/">Home</a>
               </div>
               <hr/>
               <h3>
                   ${heading}
               </h3>
               <div>
                   ${date.toDateString()}
               </div>
               <div>
                 ${content}
               </div>
               <hr/>
               <h4>Comments</h4>
               <div id="comment_form">
               </div>
               <div id="comments">
                 <center>Loading comments...</center>
               </div>
           </div>
           <script type="text/javascript" src="/ui/article.js"></script>
       </body>
     </html>
     `;
     return htmlTemplate;
 }
 
 app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'index.html'));
 });
 
 

 
 
 
    
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
       if (err) {
           res.status(500).send(err.toString());
       } else {
           if (result.rows.length === 0) {
               res.status(403).send('username/password is invalid');
           } else {
               // Match the password
               var dbString = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
               if (hashedPassword === dbString) {
                 
                 // Set the session
                 req.session.auth = {userId: result.rows[0].id};
                 // set cookie with a session id
                 // internally, on the server side, it maps the session id to an object
                 // { auth: {userId }}
                 
                 res.send('credentials correct!');
                 
               } else {
                 res.status(403).send('username/password is invalid');
               }
           }
       }
    });
 });
 var port = 8080; // Use 8080 for local development because you might already have apache running on 80
  app.listen(8080, function () {
 -  console.log('IMAD course app listening on port 80!');
 +  console.log(`IMAD course app listening on port ${port}!`);
  });
 
 app.get('/check-login', function (req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
        // Load the user object
        pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
            if (err) {
               res.status(500).send(err.toString());
            } else {
               res.send(result.rows[0].username);    
            }
        });
    } else {
        res.status(400).send('You are not logged in');
    }
 });
 
 app.get('/logout', function (req, res) {
    delete req.session.auth;
    res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
 });
 
 var pool = new Pool(config);
 
 app.get('/get-articles', function (req, res) {
    // make a select request
    // return a response with the results
    pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
 });
 
 app.get('/get-comments/:articleName', function (req, res) {
    // make a select request
    // return a response with the results
    pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
 });
 
var counter = 0;
app.get('/counter', function (req, res) {
   counter = counter + 1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) { // /submit-name?name=xxxx
  // Get the name from the request
  var name = req.query.name;
  
  names.push(name);
  // JSON: Javascript Object Notation
  res.send(JSON.stringify(names));
app.get('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!');
                            }
                        });
                }
            }
       })     
    } else }
        res.status(404).send('Only logged in users can comment');
    }
 });
 
 