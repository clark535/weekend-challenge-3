var pg = require('pg');

var pool = new pg.Pool(config);

var config = {
    database: 'todo_application', //name of our database
    host: 'localhost', //where is your datebase - which computer
    port: 5432, //the port number for your database - 5432 is default
    max: 10, // how many connections at one time
    idleTimeoutMillies: 30000 // 30 secdons to try to connect to our database
};

module.exports = new pg.Pool(config);