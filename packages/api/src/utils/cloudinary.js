require("dotenv").config();

var cloudinary = require("cloudinary");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

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

async function uploadImageToCloudinary(image, id, upload_preset) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      image,
      { upload_preset, public_id: id, width: 500 },
      (err, url) => {
        if (err) {
          return reject(err);
        }
        try {
          unlinkAsync(image);
        } catch (err) {
          return reject(err);
        }
        return resolve(url);
      },
    );
  });
}

module.exports = {
  uploadImageToCloudinary,
};
