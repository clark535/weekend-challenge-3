database: todo_application
table: todo

CREATE TABLE todo (
id SERIAL PRIMARY KEY,
task VARCHAR(120) NOT NULL,
status VARCHAR(80)
);