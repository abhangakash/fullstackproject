const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const sendEmail = require("../utils/mailer");

// ✅ Fetch All Registered Students
router.get("/", async (req, res) => {
  try {
    console.log("📩 Fetching registered students...");

    const students = await Student.find().sort({ createdAt: -1 });

    if (!students.length) {
      return res.status(404).json({ message: "No students found." });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error.message);
    res.status(500).json({ message: "Failed to fetch registrations." });
  }
});

// ✅ Register a New Student
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, branch, year } = req.body;
    console.log("📩 Incoming Registration Request:", req.body);

    if (!fullName || !email || !phone || !branch || !year) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const newStudent = new Student({ fullName, email, phone, branch, year });
    await newStudent.save();
    console.log("✅ Student Registered:", fullName);

    // 📧 Send Welcome Email
    const emailSubject = "Welcome to Your Institute!";
    const emailBody = `
      <h1>Hello ${fullName},</h1>
      <p>Thank you for registering at our Educational Institute.</p>
      <p>We’re excited to have you on board!</p>
    `;

    const emailResult = await sendEmail(email, emailSubject, emailBody);

    if (!emailResult.success) {
      console.warn("❌ Email Failed:", emailResult.error);
      return res.status(201).json({
        message: "Student registered, but email failed to send.",
        emailError: emailResult.error,
      });
    }

    res.status(201).json({ message: "Student registered successfully and email sent." });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ✅ Delete a Student (Ensures Student is Removed from MongoDB)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑 Deleting student:", id);

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("✅ Student deleted:", deletedStudent.fullName);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting student:", error.message);
    res.status(500).json({ message: "Failed to delete student" });
  }
});

module.exports = router;