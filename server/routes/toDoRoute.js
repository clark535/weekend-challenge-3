var express = require('express');
var router = express.Router();
var pg = require('pg');

var pool = require('../modules/pool');

router.get('/', function(req, res) {
    //attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query('SELECT * FROM todo;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(result.rows);
                }
            })//copy and paste form database.js
        }
    });
    // res.send(todo); to test
});

router.post('/', function(req, res){
    //attempt to connect to the database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`INSERT INTO todo (task, status) 
            VALUES ($1, $2);`, [req.body.task, req.body.status], function(errorMakingQuery, result){
                done();//have to write it with the VALUES ($1, $2, $3, ect..)', [req.body.--, req.body.--]
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(201);//201 is created.
                }
            });//copy and paste form database.js
        }
    });
});

router.put('/:id', function(req, res){
    var jobIdToComplete = req.params.id;
    //attempt to connect to the database
    pool.connect(function(errorConnectingToDatabase, client, done){//connects to the database
        if (errorConnectingToDatabase) {
            //there was an error connecting to the database
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the database
            //now, we are going to get things from the database
            client.query(`UPDATE todo SET status = 'complete' WHERE id = $1;`, [jobIdToComplete], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    //query failed, did you test in postico?
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(200);//200 is all good.
                }
            });//copy and paste form database.js
        }
    });
  });

module.exports = router;