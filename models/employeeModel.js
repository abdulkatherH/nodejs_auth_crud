const pool = require('../config/db');

const getAllEmployees = async () => {
  const res = await pool.query('SELECT * FROM employee');
  return res.rows;
};

const getEmployeeById = async (id) => {
  const res = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
  return res.rows[0];
};

const addEmployee = async (name, role, salary, experience) => {
  console.log("addEmployee");  
  const res = await pool.query('INSERT INTO employee (name, role, salary, experience) VALUES ($1, $2, $3, $4) RETURNING *', [name, role, salary, experience]);
  return res.rows[0];
};

const updateEmployee = async (id, name, role) => {
  const res = await pool.query('UPDATE employee SET name = $1, role = $2 WHERE id = $3 RETURNING *', [name, role, id]);
  return res.rows[0];
};

const deleteEmployee = async (id) => {
  await pool.query('DELETE FROM employee WHERE id = $1', [id]);
};

module.exports = { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };
