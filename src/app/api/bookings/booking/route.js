import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db"; // Changed import here
import Booking from "@/models/booking";

// This handles POST requests to the /api/bookings route
export async function POST(request) {
  await connectToDb(); // Changed function call here

  try {
    const body = await request.json();
    const {
      clientName,
      date,
      time,
      phone,
      brand,
      product,
      specialNotes,
      serviceType,
      userId,
    } = body;

    // Basic validation
    if (
      !clientName ||
      !date ||
      !time ||
      !phone ||
      !brand ||
      !product ||
      !serviceType ||
      !userId
    ) {
      return NextResponse.json(
        { message: "All required fields must be provided." },
        { status: 400 }
      );
    }

    const booking = await Booking.create(body);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
