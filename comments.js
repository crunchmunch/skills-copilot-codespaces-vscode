// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Array to store comments
var comments = [];

// Read the comments.json file and store the contents in the comments array
fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        comments = JSON.parse(data);
    }
});

// GET request to get all the comments
app.get('/comments', function(req, res) {
    res.send(comments);
});

// POST request to add a comment
app.post('/comments', function(req, res) {
    var comment = req.body;
    comments.push(comment);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send(comment);
        }
    });
});

// Listen on port 3000
app.listen(3000, function() {
    console.log('Server listening on port 3000');
});