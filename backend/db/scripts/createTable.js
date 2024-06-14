const { query } = require("../index");

const userTable = `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT, password TEXT);`;

console.log("Started creating users table");

function createTable() {
  return query(userTable);
}

createTable();

console.log("Finished creating users table");
