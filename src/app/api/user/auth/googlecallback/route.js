import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDb } from "@/lib/db";
import User from "@/models/user";
import useragent from "express-useragent";

export async function GET(req) {
  await connectToDb();
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "Authorization code not found" },
      { status: 400 }
    );
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });
    const tokenData = await tokenRes.json();
    const { access_token, refresh_token } = tokenData;

    // 2. Use the access token to get user profile information
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    const profileData = await userRes.json();

    // 3. Extract device details from the request headers
    const userAgentHeader = req.headers.get("user-agent");
    const ua = useragent.parse(userAgentHeader);

    // 4. Find or create the user and update device details
    let user = await User.findOne({ googleId: profileData.id });

    if (!user) {
      user = await User.create({
        googleId: profileData.id,
        name: profileData.name,
        email: profileData.email,
        accessToken: access_token,
        profileImageUrl: profileData.picture,
        refreshToken: refresh_token,
        devices: [
          {
            deviceId: ua.fingerprint || null, // You'll need a unique identifier
            deviceType: ua.isMobile
              ? "mobile"
              : ua.isDesktop
              ? "desktop"
              : ua.isTablet
              ? "tablet"
              : "unknown",
            os: ua.os,
            browser: ua.browser,
            lastLogin: new Date(),
          },
        ],
      });
    } else {
      user.name = profileData.name;
      user.profileImageUrl = profileData.picture;
      if (access_token) {
        user.accessToken = access_token;
      }
      if (refresh_token) {
        user.refreshToken = refresh_token;
      }

      // Find the device and update its last login time
      const existingDevice = user.devices.find(
        (device) => device.deviceId === (ua.fingerprint || null)
      );
      if (existingDevice) {
        existingDevice.lastLogin = new Date();
      } else {
        user.devices.push({
          deviceId: ua.fingerprint || null,
          deviceType: ua.isMobile
            ? "mobile"
            : ua.isDesktop
            ? "desktop"
            : ua.isTablet
            ? "tablet"
            : "unknown",
          os: ua.os,
          browser: ua.browser,
          lastLogin: new Date(),
        });
      }
      await user.save();
    }

    // 5. Set a secure cookie with user profile data
    const userProfile = {
      userId: user._id,
      name: user.name,
      profileImage: user.profileImageUrl,
    };
    cookies().set("profile", JSON.stringify(userProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // 6. Redirect the user back to the application
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Google login failed:", error);
    return NextResponse.json(
      { message: "Google login failed", error: error.message },
      { status: 500 }
    );
  }
}
