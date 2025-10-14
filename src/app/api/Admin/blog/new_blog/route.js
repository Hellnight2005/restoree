import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Blog from "@/models/Blog";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadMedia(buffer, fileName, _folderId, mimeType) {
  const dataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

  console.log("Uploading file to Cloudinary:", fileName);

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      public_id: fileName.replace(/\.[^/.]+$/, ""),
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

async function fileToBuffer(file) {
  return Buffer.from(await file.arrayBuffer());
}

export async function POST(req) {
  try {
    await connectToDb();

    const formData = await req.formData();
    const title = formData.get("title");
    const slug = formData.get("slug");
    const content = formData.get("content");
    const published = formData.get("published");
    const tags = formData.get("tags") ? JSON.parse(formData.get("tags")) : [];

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

    const exists = await Blog.findOne({ slug });
    if (exists)
      return NextResponse.json(
        { error: "Slug already exists." },
        { status: 400 }
      );

    let imageUrl = "";
    const coverImageFile = formData.get("coverImage");

    if (coverImageFile && coverImageFile.size > 0) {
      const buffer = await fileToBuffer(coverImageFile);
      const ext = coverImageFile.name.split(".").pop();

      imageUrl = await uploadMedia(
        buffer,
        `${slug}-cover.${ext}`,
        null,
        coverImageFile.type
      );
    }

    const blog = await Blog.create({
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      coverImage: imageUrl,
      tags: tags || [],
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
