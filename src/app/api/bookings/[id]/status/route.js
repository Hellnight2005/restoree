import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/db";
import Booking from "@/models/booking";
import User from "@/models/user";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function PATCH(request, { params }) {
  await connectToDb();
  const { id } = params;
  const { newStatus } = await request.json();

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    const user = await User.findById(booking.userId).select("email");

    if (!user || !user.email) {
      console.warn(
        `Email not sent: User with ID ${booking.userId} not found or has no email.`
      );
    } else {
      console.log("User Email:", user.email);
    }

    let emailSubject = "";
    let emailBody = "";

    if (newStatus === "confirmed" && booking.status === "pending") {
      booking.status = "confirmed";
      emailSubject = "Booking Confirmed!";
      emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Booking Confirmed!</h2>
          <p>Hi ${booking.clientName},</p>
          <p>We are pleased to inform you that your booking has been successfully confirmed. We look forward to seeing you!</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50;">
            <p><strong>Product:</strong> ${booking.product}</p>
            <p><strong>Date:</strong> ${booking.date.toDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
          </div>
          <p style="margin-top: 20px;">If you have any questions, please contact us.</p>
          <p style="font-size: 12px; color: #888;">&copy; restoree. All rights reserved.</p>
        </div>
      `;
    } else if (newStatus === "canceled" && booking.status === "confirmed") {
      booking.status = "canceled";
      emailSubject = "Booking Canceled";
      emailBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #F44336;">Booking Canceled</h2>
          <p>Hi ${booking.clientName},</p>
          <p>We regret to inform you that your booking for ${
            booking.product
          } on ${booking.date.toDateString()} at ${
        booking.time
      } has been canceled due to an unforeseen issue.</p>
          <p>We apologize for any inconvenience this may cause.</p>
          <p style="margin-top: 20px;">Please contact us to reschedule or for more information.</p>
          <p style="font-size: 12px; color: #888;">&copy; restoree. All rights reserved.</p>
        </div>
      `;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid status transition." },
        { status: 400 }
      );
    }

    const updatedBooking = await booking.save();

    if (user && user.email) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: emailSubject,
        html: emailBody, // Use the HTML string directly
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user.email}`);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    }

    return NextResponse.json(
      { success: true, data: updatedBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating booking or sending email:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred." },
      { status: 500 }
    );
  }
}
