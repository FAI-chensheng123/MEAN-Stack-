/**
 * Created by shengchen on 1/23/16.
 */

// load the modules you need

// This is use for build our server
var express = require('express');
var app = express();

// This is use for build the connection to the database
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);

// This is use for parse the Jason data, we inputed
var bodyParser = require('body-parser');


/*
// This is for test

app.get('/', function(req, res) {
    res.send("finally I sucess!!!");
});
*/

// setup the path, so it can read the file in the directory
app.use(express.static(__dirname + "/public"));

// parse the json data we add
app.use(bodyParser.json());

// send the request to the database
app.get('/contactlist', function (req, res) {
    console.log('I received a GET request');

    db.contactlist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });

});

// add the data to the database
app.post('/contactlist', function(req, res){
    console.log(req.body)
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    })
});

// delete the data to the database
app.delete('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
});

// choose the data you need edit
app.get('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
      res.json(doc);
    })
});

// update data from database
app.put('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);

    db.contactlist.findAndModify({
            query: {_id: mongojs.ObjectId(id)},
            update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
            new: true}, function (err, doc) {
            res.json(doc);
        }
    );

});



// express can only be used in port 3000
app.listen(3000);
console.log("Server is running on port 3000...");