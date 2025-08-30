"use client";
import React, { useEffect, useState } from "react";

interface Booking {
    _id: string;
    clientName: string;
    serviceType: string;
    date: string;
    time: string;
    status: string;
}

const RecentBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/bookings/get_all")
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    // Sort by date descending and take top 5
                    const sorted = data.data.sort((a: Booking, b: Booking) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );
                    setBookings(sorted.slice(0, 5));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading bookings...</div>;

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
            <div className="overflow-y-auto max-h-72">
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-gray-700">
                        <tr>
                            <th className="py-2 px-4">Client</th>
                            <th className="py-2 px-4">Service</th>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Time</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id} className="border-b border-gray-800 hover:bg-gray-800">
                                <td className="py-2 px-4">{b.clientName}</td>
                                <td className="py-2 px-4">{b.serviceType}</td>
                                <td className="py-2 px-4">{new Date(b.date).toLocaleDateString()}</td>
                                <td className="py-2 px-4">{b.time}</td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm ${b.status === "Confirmed"
                                                ? "bg-green-200 text-green-800"
                                                : b.status === "Completed"
                                                    ? "bg-blue-200 text-blue-800"
                                                    : b.status === "canceled"
                                                        ? "bg-red-200 text-red-800"
                                                        : "bg-yellow-200 text-yellow-800"
                                            }`}
                                    >
                                        {b.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 text-orange-400 cursor-pointer">View Details</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentBookings;
