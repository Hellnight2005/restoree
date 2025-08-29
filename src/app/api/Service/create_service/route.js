// app/api/services/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Service from "@/models/service";

export async function GET() {
  try {
    await connectToDb();

    // Only fetch the "name" field
    const services = await Service.find({}, "name");

    // services = [ { _id: "...", name: "Shoe Polishing" }, ... ]
    const serviceNames = services.map((s) => s.name);

    return NextResponse.json(
      { success: true, data: serviceNames },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST: Create a new service
export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();

    const { name, price, duration, description } = body;

    if (!name || !price || !duration) {
      return NextResponse.json(
        { success: false, error: "Name, price, and duration are required." },
        { status: 400 }
      );
    }

    const newService = await Service.create({
      name,
      price,
      duration,
      description,
    });

    return NextResponse.json(
      { success: true, data: newService },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
