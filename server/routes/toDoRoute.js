var express = require('express');
var router = express.Router();
var pg = require('pg');

var pool = require('../modules/pool');

router.get('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM todo;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.send(result.rows);
                }
            })
        }
    });
});//end get and display table on DOM

router.post('/', function(req, res){
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO todo (task, status) 
            VALUES ($1, $2);`, [req.body.task, req.body.status], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});//end insert new task into database

router.put('/:id', function(req, res){
    var jobIdToComplete = req.params.id;
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE todo SET status = 'complete' WHERE id = $1;`, [jobIdToComplete], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
  });//end database update/changing compelete-incomplete status

  router.delete('/:id', function(req, res){
    var jobIdToRemove = req.params.id;
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM todo WHERE id=$1;`, [jobIdToRemove], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    console.log('error making query', errorMakingQuery);
                    res.send(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
  });//end database delete 

module.exports = router;