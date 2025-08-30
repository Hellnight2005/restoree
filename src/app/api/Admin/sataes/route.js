import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Booking from "@/models/booking";
import User from "@/models/user";
import Service from "@/models/service";

export async function GET() {
  try {
    await connectToDb();

    // Total users
    const totalUsers = await User.countDocuments();

    // Total bookings (excluding canceled if you want)
    const totalBookings = await Booking.countDocuments({
      status: { $ne: "canceled" },
    });

    // Upcoming meetings this month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const upcomingThisMonth = await Booking.countDocuments({
      status: { $ne: "canceled" },
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    // Most popular services (aggregate by count)
    const popularServices = await Booking.aggregate([
      {
        $match: { status: { $ne: "canceled" }, serviceType: { $exists: true } },
      },
      { $group: { _id: "$serviceType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "services", // make sure your collection name is correct
          localField: "_id",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $project: {
          _id: 0,
          serviceName: "$service.name",
          description: "$service.description",
          count: 1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalBookings,
        upcomingThisMonth,
        popularServices,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
