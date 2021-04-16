require("dotenv").config();

var cloudinary = require("cloudinary");

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      image,
      { folder: "porfileImages", width: 500 },
      (err, url) => {
        if (err) {
          return reject(err);
        }
        return resolve(url);
      },
    );
  });
}

module.exports = {
  uploadToCloudinary: uploadToCloudinary,
};
