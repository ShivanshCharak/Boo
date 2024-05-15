import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import fs from 'fs'

cloudinary.config({
  cloud_name: "dnvjiudhd",
  api_key: "945994884915927",
  api_secret: "hkz57D70YvtgpsFohdFUuw3Rqv0",
});
async function uploadOnCloud(localFilePath) {
  try {
    if (!localFilePath) throw new ApiError(400, "Image path is invalid");
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null;
  }
}
export {uploadOnCloud}
