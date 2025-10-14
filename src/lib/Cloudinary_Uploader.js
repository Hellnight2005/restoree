import { v2 as cloudinary } from "cloudinary";
// Removed google, Readable, and stream as they are no longer needed for Cloudinary.

// Cloudinary Configuration
// This setup relies on the following environment variables:
// CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a buffer to Cloudinary.
 * @param {Buffer} buffer - The image data as a Buffer.
 * @param {string} fileName - The desired file name (used for public_id).
 * @param {string} _folderId - This argument is ignored, as the folder is set in the options below.
 * @param {string} mimeType - The MIME type of the file.
 * @returns {Promise<string>} The secure URL of the uploaded file.
 */
export async function uploadMedia(
  buffer,
  fileName,
  _folderId, // Renamed coverFolderId to _folderId and ignored it
  mimeType
) {
  // Cloudinary reliably accepts a Base64 data URI string for uploads
  const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

  console.log("Uploading file to Cloudinary:", fileName);

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      // Set the public ID to the file name (without extension)
      public_id: fileName.replace(/\.[^/.]+$/, ""),
      // All blog images will be stored in this specific folder in your Cloudinary account
      folder: "blog_uploads",
      overwrite: true,
      resource_type: "auto",
    });

    console.log(
      "File uploaded successfully to Cloudinary. URL:",
      result.secure_url
    );

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    throw error;
  }
}
