const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://0.0.0.0:27017/stationaryDB");

const productSchema = ({
    productid : Number,
    productname: String
});

const Product = mongoose.model("Product",productSchema);

app.route('/products');
app.get('/products', function(req,res) {
    Product.find(function(err, foundProducts){
       if(!err){
        res.send(foundProducts);
       } else {
        res.send(err);
       }
    })
});

//insert

app.post('/products', function(req,res){
    console.log();
    console.log();

    const newProduct = new Product({
    productid: req.body.productid,
    Productname: req.body.productname
});

    newProduct.save(function(err){
        if(!err){
            res.send("successfully added new item");
           } else {
            res.send(err)
           }
    });
});

// delete all items
app.delete('/products',function(req,res){
    Product.deleteMany(function(err){
        if (!err){
          res.send("Successfully deleted all the articles in wikiDB.");
        } else {
          res.send(err);
        }
      });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});