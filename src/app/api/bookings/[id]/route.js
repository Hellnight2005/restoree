import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Booking from "@/models/booking";
import Service from "@/models/service";

// GET /api/booking/[id]
export async function GET(request, { params }) {
  try {
    await connectToDb();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch bookings for user, exclude canceled, sort by date and time ascending
    const bookings = await Booking.find({
      userId: id,
      status: { $ne: "canceled" },
    }).sort({ date: 1, time: 1 }); // closest first

    if (!bookings || bookings.length === 0) {
      return NextResponse.json(
        { success: false, message: "No active bookings found for this user" },
        { status: 404 }
      );
    }

    // Enrich bookings with service details
    const enrichedBookings = await Promise.all(
      bookings.map(async (b) => {
        const bookingObj = b.toObject();
        const { userId, serviceType, ...rest } = bookingObj;

        let serviceInfo = null;
        if (serviceType) {
          const service = await Service.findById(serviceType).select(
            "name description"
          );
          if (service) {
            serviceInfo = {
              name: service.name,
              description: service.description,
            };
          }
        }

        return {
          ...rest,
          service: serviceInfo, // add service details
        };
      })
    );

    return NextResponse.json({ success: true, data: enrichedBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
