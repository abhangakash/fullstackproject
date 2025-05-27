const PDFDocument = require('pdfkit');
const path = require('path');

const generateRegistrationPDF = ({
  name,
  parentName,
  dob,
  studentClass,
  phone,
  altPhone,
  village,
  taluka,
  district,
  date = new Date(),
}) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    // HEADER
    doc.image(path.join(__dirname, 'logo512.png'), 50, 45, { width: 60 }).moveDown(); // optional logo
    doc.fontSize(20).text('Edu Institute Registration', { align: 'center', underline: true });
    doc.moveDown();

    doc
      .fontSize(12)
      .fillColor('#444')
      .text(`Date: ${date.toLocaleDateString()}`, { align: 'right' })
      .moveDown(2);

    // WELCOME TEXT
    doc
      .font('Times-Roman')
      .fontSize(14)
      .fillColor('#000')
      .text(`Welcome to Edu Institute, ${name}!`, { lineGap: 5 });

    doc.moveDown().text(
      `We are thrilled to have you as part of our vibrant learning community. Below are your registration details, confirming your successful enrollment in our institute.`,
      { lineGap: 5 }
    );

    doc.moveDown(2);

    // STUDENT DETAILS BOX
    doc
      .rect(50, doc.y, 500, 180)
      .stroke('#aaa');

    doc.fontSize(12).fillColor('#000').text('Student Registration Details:', 60, doc.y + 10);
    const labelStyle = { continued: true, bold: true };
    const valStyle = { continued: false };

    const detailRow = (label, value) => {
      doc.font('Helvetica-Bold').text(`${label}: `, { continued: true });
      doc.font('Helvetica').text(value || '-', { continued: false });
    };

    doc.moveDown();
    detailRow('Full Name', name);
    detailRow('Parent Name', parentName);
    detailRow('Date of Birth', dob || 'Not Provided');
    detailRow('Class', studentClass || 'Not Provided');
    detailRow('Phone', phone || 'Not Provided');
    detailRow('Alternate Phone', altPhone || 'Not Provided');
    detailRow('Address', `${village}, ${taluka}, ${district}` || 'Not Provided');

    doc.moveDown(3);

    // ABOUT EDU INSTITUTE
    doc.fontSize(12).fillColor('#000').text('About Edu Institute:', { underline: true });
    doc.moveDown();
    doc.font('Times-Roman')
      .fontSize(12)
      .fillColor('#000')
      .text(
        `Edu Institute is committed to fostering a comprehensive learning environment that empowers students with both academic knowledge and practical skills. Our mission is to provide world-class education and nurture talent to make a difference in society.`
      );

    doc.moveDown(2);

    // FOOTER
    doc.fontSize(10).fillColor('#444').text(
      'We look forward to supporting you throughout your academic journey at Edu Institute. If you have any questions, feel free to reach out to our support team.',
      { align: 'center' }
    );

    // SIGNATURE LINE (Optional)
    doc.moveDown(3);
    doc.text('Signature: ____________________________', { align: 'center' });

    doc.end();
  });
};

module.exports = generateRegistrationPDF;
