var pg = require('pg');

var pool = new pg.Pool(config);

var config = {
    database: 'todo_application', 
    host: 'localhost', 
    port: 5432,
    max: 10, 
    idleTimeoutMillies: 30000
};

module.exports = new pg.Pool(config);