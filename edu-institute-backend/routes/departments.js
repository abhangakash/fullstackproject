const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new department
router.post('/', async (req, res) => {
  const { name, short, description } = req.body;

  if (!name || !short) {
    return res.status(400).json({ message: "Name and Short code are required" });
  }

  try {
    const newDepartment = new Department({ name, short, description });
    const savedDept = await newDepartment.save();
    res.status(201).json(savedDept);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update department by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, short, description } = req.body;

  try {
    const dept = await Department.findById(id);
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    dept.name = name || dept.name;
    dept.short = short || dept.short;
    dept.description = description || dept.description;

    const updatedDept = await dept.save();
    res.json(updatedDept);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE department by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const dept = await Department.findById(id);
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    await dept.remove();
    res.json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
