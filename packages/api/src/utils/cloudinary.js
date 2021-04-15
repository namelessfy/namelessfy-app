var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dm24mhrnp",
  api_key: "672179561513475",
  api_secret: "4E8EDj3j98ojwqUUa95IZmd7Ufg",
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
