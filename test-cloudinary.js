require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Configured with:", cloudinary.config().cloud_name);
cloudinary.api.ping().then(console.log).catch(err => {
    console.error("PING FAILED");
    console.error(err);
});
