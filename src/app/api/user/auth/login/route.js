// src/app/api/user/auth/login/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDb } from "@/lib/db";
import User from "@/models/user";

export async function POST(req) {
  // 1. Connect to the database
  await connectToDb();

  try {
    // 2. Receive credentials
    const { email, password } = await req.json();

    // 3. Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // 4. Validate password using the instance method on the User model
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 5. Handle authentication success
    const userProfile = {
      userId: user._id,
      name: user.name,
    };

    // Save a secure cookie with the user's profile information
    cookies().set("profile", JSON.stringify(userProfile), {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      maxAge: 60 * 60 * 24 * 7, // Cookie expiration: 7 days
      path: "/",
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
