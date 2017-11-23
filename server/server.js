var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var toDoRoute = require('./routes/toDoRoute');
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


app.use('/todo', toDoRoute);

// app.use('/todo', function(req, res){
//     console.log('server working');
    //res.send(toDoRoute.js);
//});


app.listen(port, function(){
    console.log('listening on port', port);
  });