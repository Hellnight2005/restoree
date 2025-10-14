import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Blog from "@/models/Blog";
// *** NEW FIX: Import the Cloudinary SDK directly and remove external dependency ***
import { v2 as cloudinary } from "cloudinary";

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
async function uploadMedia(buffer, fileName, _folderId, mimeType) {
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

export const config = {
  api: {
    bodyParser: false, // disable Next.js default parser for handling file uploads
  },
};

// Helper to convert file to buffer
async function fileToBuffer(file) {
  return Buffer.from(await file.arrayBuffer());
}

export async function POST(req) {
  try {
    // === 1. Connect to Database ===
    await connectToDb();

    // Read multipart/form-data
    const formData = await req.formData();
    const title = formData.get("title");
    const slug = formData.get("slug");
    const content = formData.get("content");
    const published = formData.get("published");
    const tags = formData.get("tags") ? JSON.parse(formData.get("tags")) : [];

    // Validation checks... (omitted for brevity)
    if (!title || title.trim().length < 5)
      return NextResponse.json(
        { error: "Title must be at least 5 characters." },
        { status: 400 }
      );

    if (!slug || slug.trim().length < 3 || !/^[a-z0-9-]+$/.test(slug))
      return NextResponse.json(
        {
          error:
            "Slug must be at least 3 characters and contain only lowercase letters, numbers, and hyphens.",
        },
        { status: 400 }
      );

    if (!content || content.trim().length < 20)
      return NextResponse.json(
        { error: "Content must be at least 20 characters." },
        { status: 400 }
      );

    // === 2. Check for Duplicate Slug ===
    const exists = await Blog.findOne({ slug });
    if (exists)
      return NextResponse.json(
        { error: "Slug already exists." },
        { status: 400 }
      );

    // --- Cloudinary Upload Logic ---
    let imageUrl = "";
    const coverImageFile = formData.get("coverImage");

    if (coverImageFile && coverImageFile.size > 0) {
      const buffer = await fileToBuffer(coverImageFile);
      const ext = coverImageFile.name.split(".").pop();

      // Call the locally defined function 'uploadMedia'
      imageUrl = await uploadMedia(
        buffer,
        `${slug}-cover.${ext}`,
        null,
        coverImageFile.type
      );
    }

    // === 3. Create Blog in MongoDB ===
    const blog = await Blog.create({
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      coverImage: imageUrl,
      tags: tags || [],
      // Ensure 'published' is a boolean
      published: published === "true" || published === true,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { error: error.message, detail: "Error processing blog creation." },
      { status: 500 }
    );
  }
}
