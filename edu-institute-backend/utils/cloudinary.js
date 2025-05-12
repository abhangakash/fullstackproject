const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Load environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'gallery_images', // optional: specify folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // unique filename
  },
});

module.exports = { cloudinary, storage };
