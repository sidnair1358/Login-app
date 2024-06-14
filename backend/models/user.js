const { query } = require("../db/index");

async function addUser(firstName, lastName, email, password) {
  const user = await query(
    `INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4);`,
    [firstName, lastName, email, password]
  );
  return user.rows;
}

async function checkUserExists(email) {
  const user = await query(
    `SELECT EXISTS (
    SELECT 1 
    FROM users 
    WHERE email = $1
  )`,
    [email]
  );
  return user.rows;
}

async function getUser(email) {
  const user = await query(`SELECT * FROM users WHERE email = $1;`, [email]);
  return user.rows;
}
async function getAllUsers() {
  const users = await query(`SELECT * FROM users;`);
  return users.rows;
}

module.exports = {
  addUser,
  getUser,
  checkUserExists,
  getAllUsers,
};
