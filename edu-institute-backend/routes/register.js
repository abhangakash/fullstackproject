const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

const sendEmail = require("../utils/mailer");
const multer = require("multer");
const path = require("path");
const PDFDocument = require("pdfkit");
require("dotenv").config(); // load environment variables

// Multer storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Function to generate styled PDF
const generateStudentPDF = ({
  name,
  parentName,
  village,
  taluka,
  district,
  phone,
  altPhone,
  studentClass,
  dob,
  email,
}) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "portrait" });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Path to the logo image
const logoPath = path.join(__dirname, 'logo512.png'); // Hardcoded path

    // Header Section with Logo and Institute Name
    doc.image(logoPath, 25, 25, { width: 70 }) // Add logo
      .fontSize(26)
      .fillColor("#004080")
      .text("Edu Institute", 180, 50, { align: "left" })
      .fontSize(12)
      .fillColor("#555555")
      .text("Empowering Students with Knowledge", 180, 80, { align: "left" })
      .moveDown(2);

    // Divider Line Under Header
    doc.moveTo(50, 120)
      .lineTo(550, 120)
      .strokeColor("#004080")
      .lineWidth(2)
      .stroke();

    doc.moveDown(1);

    // Title Section
    doc.fontSize(18)
      .fillColor("#004080")
      .text("Student Registration Confirmation", { align: "center" })
      .moveDown(2);

    // Student Details Section
    doc.fontSize(12)
      .fillColor("#000000");

    doc.text("Full Name: " + name)
      .moveDown()
      .text("Parent Name: " + parentName)
      .moveDown()
      .text("Date of Birth: " + dob)
      .moveDown()
      .text("Class: " + studentClass)
      .moveDown()
      .text("Phone: " + phone)
      .moveDown()
      .text("Alternate Phone: " + altPhone)
      .moveDown()
      .text("Email: " + email)
      .moveDown()
      .text("Address: " + `${village}, ${taluka}, ${district}`)
      .moveDown(1);

    // Add Divider Line Between Sections
    doc.moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor("#004080")
      .lineWidth(1)
      .stroke();

    doc.moveDown(2);

    // Additional Notes Section with Declaration (if applicable)
    doc.fontSize(12).fillColor("#555555")
      .text("Important Notes:", { underline: true })
      .moveDown()
      .text("1. Your registration has been successfully recorded.")
      .moveDown()
      .text("2. If any of the details above are incorrect, please contact us immediately.")
      .moveDown()
      .text("3. Please ensure you complete all necessary documents for future steps.")
      .moveDown(2);

    if (process.env.DECLARATION_ENABLED === "true") {
      doc.text("Your signed declaration form is attached.", { align: "center" })
        .moveDown(2);
    }

   
    // Social Media Links (Optional)
    
    // End Document
    doc.end();
  });
};

// POST: Register Student
router.post("/", upload.single("profilePic"), async (req, res) => {
  try {
    const {
      name,
      parentName,
      village,
      taluka,
      district,
      phone,
      altPhone,
      studentClass,
      dob,
      email,
      declaration,
    } = req.body;

    const newStudent = new Student({
      name,
      parentName,
      profilePic: req.file ? req.file.path : '',
      address: { village, taluka, district },
      phone,
      altPhone,
      studentClass,
      dob,
      email,
      declaration: declaration === 'true',
    });

    await newStudent.save();

    // Create a PDF buffer with the new styling
    const pdfBuffer = await generateStudentPDF({
      name,
      parentName,
      village,
      taluka,
      district,
      phone,
      altPhone,
      studentClass,
      dob,
      email,
    });

    // Attach PDF if declaration is true
    let attachments = [];
    if (declaration === 'true') {
      attachments.push({
        filename: "Student_Registration_Details.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      });
    }

    if (email) {
      const logoUrl = process.env.INSTITUTE_LOGO_URL;
      const emailSubject = "🎓 Edu Institute | Student Registration Confirmation";

      const emailBody = `
        <div style="font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #f2f4f6; padding: 40px 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="background-color: #004080; padding: 30px; text-align: center; color: white;">
              <img src="${logoUrl}" alt="Edu Institute Logo" style="max-height: 60px; margin-bottom: 10px;" />
              <h1 style="margin: 0; font-size: 24px;">Edu Institute</h1>
              <p style="margin: 5px 0 0; font-size: 16px;">Student Registration Confirmation</p>
            </div>

            <div style="padding: 30px;">
              <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
              <p style="font-size: 16px;">We are pleased to inform you that your registration at <strong>Edu Institute</strong> has been successfully completed. Below is a summary of your provided information:</p>

              <table style="width: 100%; font-size: 15px; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px 0;"><strong>Full Name:</strong></td><td>${name}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Parent Name:</strong></td><td>${parentName}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Date of Birth:</strong></td><td>${dob}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Class:</strong></td><td>${studentClass}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Alternate Phone:</strong></td><td>${altPhone}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Address:</strong></td><td>${village}, ${taluka}, ${district}</td></tr>
              </table>

              ${declaration === 'true' ? ` 
                <p style="margin-top: 20px; font-size: 15px;">Your signed declaration form is attached as a PDF.</p>
              ` : ''}

              <p style="margin-top: 30px; font-size: 15px;">If you have any questions, feel free to contact us at any time.</p>

              <p style="margin-top: 25px; font-size: 15px;">Warm regards,<br><strong>Edu Institute Team</strong></p>
            </div>

            <div style="background-color: #e9ecef; text-align: center; padding: 20px; font-size: 13px; color: #6c757d;">
              &copy; ${new Date().getFullYear()} Edu Institute. All rights reserved.
            </div>
          </div>
        </div>
      `;

      const emailResult = await sendEmail(email, emailSubject, emailBody, attachments);
      if (!emailResult.success) {
        console.warn("Email failed:", emailResult.error);
        return res.status(201).json({
          message: "Student registered, but email failed to send.",
          emailError: emailResult.error,
        });
      }
    }

    res.status(201).json({ message: "Student registered successfully and email sent." });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error during registration." });
  }
});

module.exports = router;
