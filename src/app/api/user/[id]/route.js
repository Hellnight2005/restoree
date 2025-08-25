import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import User from "@/models/user";

export async function GET(req, { params }) {
  await connectToDb();
  const { id } = params;

  try {
    const user = await User.findById(id).select("-password"); // Exclude the password field

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
