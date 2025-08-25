import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Booking from "@/models/booking";

// This handles GET requests to the /api/bookings route
export async function GET(request) {
  await connectToDb();

  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    let filter = { status: "confirmed" };

    if (dateParam) {
      const startOfDay = new Date(dateParam);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(startOfDay);
      endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

      filter.date = { $gte: startOfDay, $lt: endOfDay };
    }

    // Find all confirmed bookings and sort them by date in ascending order
    const confirmedBookings = await Booking.find(filter).sort({ date: 1 });

    return NextResponse.json(
      { success: true, data: confirmedBookings },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
