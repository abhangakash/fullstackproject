const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

async function generateStudentPDF({ fullName, email, phone, branch, year }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 420]);
  const { width, height } = page.getSize();

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Colors
  const primaryBlue = rgb(0.2, 0.4, 0.8);
  const darkGray = rgb(0.2, 0.2, 0.2);
  const lightGray = rgb(0.9, 0.9, 0.95);

  // Margins
  const margin = 40;

  // Draw background color (optional)
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(1, 1, 1),
  });

  // Draw border
  page.drawRectangle({
    x: margin / 2,
    y: margin / 2,
    width: width - margin,
    height: height - margin,
    borderColor: primaryBlue,
    borderWidth: 3,
    borderOpacity: 0.7,
  });

  // Draw header rectangle
  page.drawRectangle({
    x: margin / 2,
    y: height - 80,
    width: width - margin,
    height: 60,
    color: primaryBlue,
    opacity: 0.85,
  });

  // Add header text
  page.drawText("Edu Institute", {
    x: margin,
    y: height - 60,
    size: 28,
    font: helveticaBoldFont,
    color: rgb(1, 1, 1),
  });

  // Add Logo (if exists)
  const logoPath = path.join(__dirname, "logo512.png");
  if (fs.existsSync(logoPath)) {
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImage, {
      x: width - margin - 80,
      y: height - 75,
      width: 60,
      height: 40,
    });
  }

  // Title
  page.drawText("Student Registration Confirmation", {
    x: margin,
    y: height - 120,
    size: 18,
    font: helveticaBoldFont,
    color: primaryBlue,
  });

  // Draw a line under title
  page.drawLine({
    start: { x: margin, y: height - 130 },
    end: { x: width - margin, y: height - 130 },
    thickness: 1.5,
    color: primaryBlue,
  });

  // Info box background
  page.drawRectangle({
    x: margin,
    y: height - 310,
    width: width - 2 * margin,
    height: 160,
    color: lightGray,
    borderRadius: 8,
  });

  const fontSize = 14;
  const textColor = darkGray;

  // Info text with spacing
  const infoStartY = height - 150;
  const lineSpacing = 22;

  page.drawText(`Full Name: ${fullName}`, {
    x: margin + 15,
    y: infoStartY,
    size: fontSize,
    font: helveticaFont,
    color: textColor,
  });
  page.drawText(`Email: ${email}`, {
    x: margin + 15,
    y: infoStartY - lineSpacing,
    size: fontSize,
    font: helveticaFont,
    color: textColor,
  });
  page.drawText(`Phone: ${phone}`, {
    x: margin + 15,
    y: infoStartY - 2 * lineSpacing,
    size: fontSize,
    font: helveticaFont,
    color: textColor,
  });
  page.drawText(`Branch: ${branch}`, {
    x: margin + 15,
    y: infoStartY - 3 * lineSpacing,
    size: fontSize,
    font: helveticaFont,
    color: textColor,
  });
  page.drawText(`Year: ${year}`, {
    x: margin + 15,
    y: infoStartY - 4 * lineSpacing,
    size: fontSize,
    font: helveticaFont,
    color: textColor,
  });

  // Timestamp
  const timestamp = new Date().toLocaleString();
  page.drawText(`Registration Date: ${timestamp}`, {
    x: margin + 15,
    y: infoStartY - 6 * lineSpacing,
    size: 12,
    font: helveticaFont,
    color: rgb(0.4, 0.4, 0.4),
  });

  // Footer text
  const footerText = `© 2025 Edu Institute. All rights reserved.`;
  page.drawText(footerText, {
    x: margin,
    y: margin / 2,
    size: 10,
    font: helveticaFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Save and return
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

module.exports = generateStudentPDF;
