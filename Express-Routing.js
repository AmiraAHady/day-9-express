var express = require("express");
var app = express();
//First-match wins
// This responds with "Hello World" on the homepage




app.get("/", function (req, res) {
  //get products
  console.log("Got a GET request for the homepage");
  res.send("Hello GET");
});

// This responds a POST request for the homepage
app.post("/", function (req, res) {
  //add product
  console.log("Got a POST request for the homepage");
  res.send("Hello POST");
});

// This responds a PUT request for the homepage
app.put("/", function (req, res) {
  //update product
  //id
  console.log("Got a PUT request for the homepage");
  res.send("Hello PUT");
});

// This responds a DELETE request for the /del_user page.
app.delete("/", function (req, res) {
  //id
  console.log("Got a DELETE request for /del_user");
  res.send("Hello DELETE");
});

// This responds a GET request for the /home page.

//requests handling order differs here, to not conflict between /home, and /:id

app.get("/home", function (req, res) {
  console.log("Got a GET request for /home");
  res.send("home route");
});

//First match wins
app.get("/abcd", function (req, res, next) {
  // console.log("Got a GET request for /home");
  next(); //next match
  res.send("abcd route");
  // console.log('hello');
  // res.send('abcd route');
  //res.redirect('/home');
});
//localhost/products/?name='bag& price=100
// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get("/ab*cd", function (req, res) {
  //abxdcd,ab41kfcd,abcd
  console.log("Got a GET request for /ab*cd");
  res.send("Page Pattern Match");
});

//query params
///getProduct/1
///getProduct/2
///getProduct/5

var products = [
  { id: "1", name: "IPhone", price: 50 },
  { id: "8", name: "IPhone", price: 99 },
  { id: "33", name: "IPhone", price: 80 },
  { id: "12", name: "IPhone", price: 60 },
  { id: "2", name: "laptop", price: 40 },
  { id: "3", name: "disk", price: 50 },
  { id: "4", name: "headphone", price: 43 },
];
app.get("/getProduct/:id", function (req, res) {
  var product = {};
  console.log(req.params.id);
  products.forEach(function (item) {
    if (item.id == req.params.id) {
      product = item;
    }
  });

  res.send(product);
  // res.send("id: " + req.params.hamada);
});
app.delete("/deleteProduct/:id", function (req, res) {
  var newProducts = products.filter(function (item) {
    if (item.id != req.params.id) {
      return item;
    }
  });

  res.send(newProducts);
  // res.send("id: " + req.params.hamada);
});
app.put("/deleteProduct/:id", function (req, res) {
  var newProducts = products.filter(function (item) {
    if (item.id != req.params.id) {
      return item;
    }
  });

  res.send(newProducts);
  // res.send("id: " + req.params.hamada);
});
app.get("/getProductPrice/:price", function (req, res) {
  var myPrice = +req.params.price;
  var pricedProductds = products.filter(function (item) {
    if (item.price == myPrice) {
      return item;
    }
  });

  res.send(pricedProductds);
  // res.send("id: " + req.params.hamada);
});
// app.get('/getProducts', function(req, res) {
//     res.send(products)
//     // res.send("id: " + req.params.hamada);
// });

// /localhost/products/?name='bag& price=100 //query string
app.get("/filterProducts", function (req, res) {
  var productName = req.query.name;
  var productPriceLimit = +req.query.priceLimit;
  console.log(productName,productPriceLimit);
  var filteredProductds = products.filter(function (item) {
    if (item.name == productName && item.price > productPriceLimit) {
      return item;
    }
  });
  res.send(filteredProductds);
  // res.send("id: " + req.params.hamada);
});
app.post("/addProduct", function (req, res) {
  var productName = req.query.name;
  var productPrice= +req.query.price;
  console.log(req.query);
     var newProduct={
       name:productName,
       price:productPrice,
       id:'100'
     }
     products.push(newProduct);
  res.send({
    massage:'product added successfully',
    newProductsArry:products
  });
  // res.send("id: " + req.params.hamada);
});

//URL Params: localhost:8081/getProduct/a123

app.get("/test/:id([0-9]{5})", function (req, res) {
  res.send("id: " + req.params.id);
});

// /localhost/products/?name='bag& price=100&mai=kkdhkdj //query string
//localhost:8081/test/12345

//Other routes here
// wildcard route


//Responds to all HTTP verbs (This method is generally used for defining middleware)
// app.all("*", function (req, res) {
//   res.send("Sorry, Page not found...");
// });

app.get('*', function(req, res, next) {
    res.send('Sorry, this is an invalid URL.');
    // next(); // will execute the next matching route
}); 

app.listen(8082, function () {
  console.log("Example app listening");
});
