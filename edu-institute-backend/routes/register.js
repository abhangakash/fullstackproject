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
   const emailSubject = "Welcome to [Edu Institute Name]!";
const emailBody = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f7fc;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 50px auto;
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2C3E50;
          font-size: 2rem;
          text-align: center;
        }
        p {
          font-size: 1.1rem;
          color: #333;
          text-align: center;
        }
        .footer {
          font-size: 0.9rem;
          color: #7f8c8d;
          text-align: center;
          margin-top: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #3498db;
          color: white;
          font-size: 1.1rem;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
          text-align: center;
        }
        .button:hover {
          background-color: #2980b9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to [Edu Institute Name], ${fullName}!</h1>
        <p>Thank you for registering with us. We are excited to have you as part of our learning community.</p>
        <p>If you have any questions or need assistance, feel free to reach out to us at any time.</p>
        <a href="https://abhang.site" class="button">Visit Dashboard</a>
        <div class="footer">
          <p>&copy; 2025 [Edu Institute Name], All Rights Reserved.</p>
        </div>
      </div>
    </body>
  </html>
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
