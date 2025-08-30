import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Booking from "@/models/booking";

export async function GET(request) {
  try {
    await connectToDb();

    // Populate the serviceType field to get service details instead of just the ID
    const bookings = await Booking.find({}).sort({ date: -1 }).populate({
      path: "serviceType", // the reference field in Booking
      select: "name", // only fetch these fields
    });

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { success: false, message: "No bookings found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, count: bookings.length, data: bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
