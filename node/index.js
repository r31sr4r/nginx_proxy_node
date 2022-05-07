const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = "CREATE TABLE IF NOT EXISTS people (ID INT PRIMARY KEY AUTO_INCREMENT, name varchar(255))"

connection.query(createTable);

const sql = "INSERT INTO people(name) values ('Rafael'), ('João'), ('Maria'), ('Marta')";
connection.query(sql)

const selectPeople = `SELECT name FROM people`

peopleList = [];

people = connection.query(selectPeople, (error, result, fields) => {
    if (error) {
      return console.error(error.message);
    }
    Object.keys(result).forEach(function(key) {
        var row = result[key];
        peopleList.push(row.name)
      });
  });

connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!!</h1>' + peopleList.map(name => {
        return `<b>Nome:</b> ${name} <br/>`
    }).join(''))
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})