const {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require('../models/employeeModel');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving employees' });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving employee' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    console.log("createEmployee");
    const { name, role, salary, experience } = req.body;
    const newEmployee = await addEmployee(name, role, salary, experience);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Error creating employee' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, role } = req.body;
    const updated = await updateEmployee(req.params.id, name, role);
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await deleteEmployee(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};
