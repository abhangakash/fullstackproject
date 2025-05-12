const multer = require('multer');
const { storage } = require('./cloudinary'); // use CloudinaryStorage

const upload = multer({ storage });

module.exports = upload;
