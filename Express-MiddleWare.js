var express = require("express"),
    bodyParser = require("body-parser");

var app = express();
var names = ['ramy','ola'];
/*
Middleware functions are functions that have access to the request object (req),
the response object (res), and the next middleware function in the
application�s request-response cycle. These functions are used to modify req and res
objects for tasks like parsing request bodies, adding response headers, etc.

//
One of the most important things about middleware in express is that
the order in which they are written/included in your file,
are the order in which they are executed, given that the route matches.
*/

/*
//3rd party Middleware
app.use(bodyParser.urlencoded({
    extended: true// to avoid depricated warning
}));
*/

//custom Middleware
app.use(function (res, req, next) {
    console.log(names);
    next();
});

/*
//all() run over all http verbs
app.all("/", function (req, res, next) {
    //res.send("testingAll");
    console.log("from ALL");
    next();
});
*/
//express has function names after http verbs
//we can have multiple callbach, hence its important to add next

app.get("/",function (req, res) {
    // console.log("Hello GET");
    res.end("Hello Get");
});

// app.use(function (res, req, next) {
//     console.log(names);
//     next();
// });


 
// app.get("/", function (req, res, next) {
//     console.log(names);
//     next();
// }, function (req, res) {
//     res.send("hello world!");
// });
 
app.post("/",function (req, res) { 
    console.log("Post");
    res.end("Hello from Post");
    

});



app.get('/home',function(req,res){
    res.send('welcome home')
})


app.listen(3000, function () {
    console.log("ready to recieve requests")
});

//__dirname:current directory
/*

//routeFunction Middleware
app.all()
app.get()
app.post()
*/
//built-in Middleware
// app.use(express.static("./public"));

