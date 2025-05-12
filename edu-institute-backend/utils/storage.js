const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary').CloudinaryStorage;

// Configure Cloudinary credentials (Ensure this is in your environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new multerStorageCloudinary({
  cloudinary: cloudinary,
  params: {
    folder: 'gallery_images', // Folder name in Cloudinary
    format: async (req, file) => 'jpg', // Define the image format
    public_id: (req, file) => file.originalname, // Optional: Set public ID for file
  },
});

const upload = multer({ storage });

module.exports = upload;
