const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary connection setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config for PDF/Resumes
const resumeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uniskills/resumes', // folder in Cloudinary
    allowed_formats: ['pdf'],
    format: 'pdf', // force format to pdf
    resource_type: 'raw', // needed for non-image files like pdfs
    public_id: (req, file) => {
      const cleanName = file.originalname.replace(/\.pdf$/i, '').replace(/\s+/g, '-');
      return Date.now() + '-' + cleanName;
    },
  },
});

// Storage config for Profile Pictures
const profilePicStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uniskills/profile_pics',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => 'pp-' + Date.now(),
  },
});

module.exports = {
  cloudinary,
  resumeStorage,
  profilePicStorage
};
