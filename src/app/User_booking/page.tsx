"use client";
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { gsap } from "gsap";

interface BookingData {
    _id: string;
    clientName: string;
    phone: string;
    brand: string;
    product: string;
    date: string;
    time: string;
    status: string;
    specialNotes: string;
    createdAt: string;
    updatedAt: string;
    service?: {
        name: string;
        description: string;
    };
}

const UserBookingPage = () => {
    const [bookings, setBookings] = useState<BookingData[]>([]);
    const [loading, setLoading] = useState(true);
    const bookingsRef = useRef<HTMLDivElement>(null);

    const fetchBookings = async () => {
        try {
            const profileCookie = Cookies.get("profile");
            if (!profileCookie) return;

            const profileData = JSON.parse(profileCookie);
            const userId = profileData?.userId;
            if (!userId) return;

            const res = await fetch(`/api/bookings/${userId}`, {
                cache: "no-store",
            });
            const data = await res.json();

            if (data.success && Array.isArray(data.data)) {
                setBookings(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        const interval = setInterval(fetchBookings, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (bookingsRef.current) {
            gsap.fromTo(
                bookingsRef.current.children,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
            case "confirmed":
                return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
            case "canceled":
                return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="text-lg text-gray-700 dark:text-gray-200">
                    Loading booking details...
                </p>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="text-lg text-red-600 dark:text-red-400">
                    No bookings found for this user.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center animate-fade-in">
                Your Bookings 🚀
            </h1>

            <div ref={bookingsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {booking.product} ({booking.brand})
                            </h2>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(
                                    booking.status
                                )}`}
                            >
                                {booking.status}
                            </span>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                            <div className="flex items-center">
                                <span className="font-medium mr-2">📅 Date:</span>
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium mr-2">⏰ Time:</span>
                                <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-medium mr-2">📞 Phone:</span>
                                <span>{booking.phone}</span>
                            </div>

                            {/* ✅ Service info after phone */}
                            {booking.service
                                && (
                                    <div className="flex flex-col mt-2 text-sm">
                                        <span className="font-medium">🛠 Service:</span>
                                        <span className="ml-2">{booking.service.name}</span>
                                        {/* {console.log(booking.service.description)} */}
                                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                            {booking.service.description}
                                        </span>
                                    </div>
                                )}

                            {booking.specialNotes && (
                                <div className="mt-2 text-xs">
                                    <span className="font-medium">📝 Notes:</span>{" "}
                                    {booking.specialNotes}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBookingPage;
