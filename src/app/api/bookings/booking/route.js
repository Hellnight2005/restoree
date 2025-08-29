import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Booking from "@/models/booking";
import Service from "@/models/service"; // import your Service model

// POST /api/bookings
export async function POST(request) {
  await connectToDb();

  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      brand,
      product,
      date,
      time,
      notes,
      serviceType, // will come as string: "Shoe Polishing"
      userId,
    } = body;

    // 🔍 Find the service by its name
    const service = await Service.findOne({ name: serviceType });
    if (!service) {
      return NextResponse.json(
        { success: false, message: `Service '${serviceType}' not found.` },
        { status: 404 }
      );
    }

    // ✅ Check that the date is not in the past
    const bookingDate = new Date(date);
    const today = new Date();

    // normalize today (ignore hours/minutes/seconds)
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return NextResponse.json(
        { success: false, message: "Booking date cannot be in the past." },
        { status: 400 }
      );
    }

    // Map to Booking schema
    const bookingData = {
      clientName: name,
      phone,
      brand,
      product,
      date: bookingDate,
      time,
      specialNotes: notes,
      serviceType: service._id, // ✅ store ObjectId, not string
      userId,
    };

    // Basic validation
    if (
      !bookingData.clientName ||
      !bookingData.date ||
      !bookingData.time ||
      !bookingData.phone ||
      !bookingData.brand ||
      !bookingData.product ||
      !bookingData.serviceType ||
      !bookingData.userId
    ) {
      return NextResponse.json(
        { message: "All required fields must be provided." },
        { status: 400 }
      );
    }

    const booking = await Booking.create(bookingData);

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
