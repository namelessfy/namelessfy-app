import axios from "axios";

export const getFileUrl = ({ file, onUploadProgress }) => {
  const songUploadPreset = process.env.REACT_APP_CLOUDINARY_SONG_UPLOAD_PRESET;
  const unsignedCloudName = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;

  const url = `https://api.cloudinary.com/v1_1/${unsignedCloudName}/upload`;

  const formData = new FormData();
  formData.append("upload_preset", songUploadPreset);
  formData.append("file", file);
  formData.append("resource_type", "video");
  formData.append("tags", "browser_upload");

  const config = {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "multipart/form-data",
    },
    // eslint-disable-next-line func-names
    onUploadProgress: onUploadProgress,
  };

  return axios.post(url, formData, config);
};
