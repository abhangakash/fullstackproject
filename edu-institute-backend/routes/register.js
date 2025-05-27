const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const sendEmail = require("../utils/mailer");
const generateStudentPDF = require("../utils/pdfGenerator");

// Fetch All Registered Students
router.get("/", async (req, res) => {
  try {
    console.log("Fetching registered students...");
    const students = await Student.find().sort({ createdAt: -1 });

    if (!students.length) {
      return res.status(404).json({ message: "No students found." });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: "Failed to fetch registrations." });
  }
});

// Register a New Student
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, branch, year } = req.body;

    if (!fullName || !email || !phone || !branch || !year) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const newStudent = new Student({ fullName, email, phone, branch, year });
    await newStudent.save();

    // Generate PDF with border, logo, and timestamp
    const pdfBuffer = await generateStudentPDF({ fullName, email, phone, branch, year });

    // Email content
    const emailSubject = "Welcome to Edu Institute - Let's Get Started!";
    const emailBody = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f7fc;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 650px;
              margin: 30px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #3498db;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header img {
              max-width: 150px;
            }
            h1 {
              color: #2C3E50;
              font-size: 2.2rem;
              margin-top: 20px;
            }
            p {
              font-size: 1.1rem;
              color: #333;
              line-height: 1.6;
            }
            .cta-button {
              background-color: #3498db;
              color: white;
              padding: 15px 25px;
              font-size: 1.1rem;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin-top: 20px;
              text-align: center;
            }
            .cta-button:hover {
              background-color: #2980b9;
            }
            .section-title {
              font-size: 1.5rem;
              font-weight: bold;
              color: #3498db;
              margin-top: 30px;
              text-align: center;
            }
            .info-box {
              background-color: #ecf0f1;
              padding: 15px;
              border-radius: 5px;
              margin-top: 15px;
            }
            .footer {
              font-size: 0.9rem;
              color: #7f8c8d;
              text-align: center;
              margin-top: 30px;
            }
            .footer a {
              color: #3498db;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://abhang.site/logo512.png" alt="Edu Institute Logo">
            </div>

            <h1>Welcome, ${fullName}!</h1>
            <p>We are thrilled to have you join us at <strong>Edu Institute</strong>. Thank you for registering with us!</p>
            <p>We are committed to providing you with the best educational experience. Here’s how you can get started:</p>

            <div class="section-title">What's Next?</div>
            <div class="info-box">
              <p>Log into your personalized student dashboard to view your courses and manage your schedule.</p>
              <p>Explore the resources available to help you succeed—check out our library and student support services.</p>
            </div>

            <a href="https://abhang.site" class="cta-button">Visit Your Dashboard</a>

            <div class="section-title">Need Help?</div>
            <div class="info-box">
              <p>If you have any questions or need assistance, our support team is here for you!</p>
              <p>Feel free to contact us at <a href="https://abhang.site/contact">Contact Us</a>.</p>
            </div>

            <div class="footer">
              <p>&copy; 2025 Edu Institute | All Rights Reserved.</p>
              <p>Follow us on:
                <a href="https://twitter.com/eduinstitute">Twitter</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email with PDF attached
    const emailResult = await sendEmail(email, emailSubject, emailBody, [
      {
        filename: "RegistrationDetails.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ]);

    if (!emailResult.success) {
      console.warn("Email failed:", emailResult.error);
      return res.status(201).json({
        message: "Student registered, but email failed to send.",
        emailError: emailResult.error,
      });
    }

    res.status(201).json({ message: "Student registered successfully and email sent." });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// Delete a Student (Ensures Student is Removed from MongoDB)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting student:", id);

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    console.log("Student deleted:", deletedStudent.fullName);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({ message: "Failed to delete student" });
  }
});

module.exports = router;
