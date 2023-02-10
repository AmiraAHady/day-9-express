var express = require('express');
var app = express();

var bodyParser = require('body-parser');
/*
Middleware functions are functions that have access to the request object (req),
the response object (res), and the next middleware function in the
application�s request-response cycle. These functions are used to modify req and res
objects for tasks like parsing request bodies, adding response headers, etc.

Middleware functions can perform the following tasks:
 - execute any code.
 - Make changes to the request and the response objects.
 - End the request-response cycle.
 - Call the next middleware function in the stack.
https://expressjs.com/en/guide/using-middleware.html
//
One of the most important things about middleware in express is that
the order in which they are written/included in your file,
are the order in which they are executed, given that the route matches.
*/


/*
If extended is false, you can not post "nested object"
person[name] = 'cw'
// Nested Object = { person: { name: cw } }


If extended is true, you can do whatever way that you like.
*/
// var urlencodedParser = bodyParser.urlencoded({ extended: true });
// app.use(urlencodedParser);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); //to read posted JSON data


app.get('/home', function(req, res) {
    res.sendFile(__dirname + "/" + "Express-PostMethod.html");
})

app.post('/process_post', function(req, res) {

    // Prepare output in JSON format
    /*response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };*/

    //console.log(response);
    //res.end(JSON.stringify(response));
    res.end("<b>Welcome</b>: " + req.body.first_name + " " + req.body.last_name);
})

var server = app.listen(8080, function() {

        var host = server.address().address
        var port = server.address().port

        console.log("Example app listening at http://%s:%s", host, port)

    })
    /*
    you should install body-parser module to run this demo
     -- npm install body-parser 
    run the server, and try it
    http://127.0.0.1:8081/ExpressPostMethod
    */