"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import BookingDetailsModal from './BookingDetailsModal';
import AddServiceModal from './AddServiceModal';
import UploadGalleryModal from '@/components/UploadGalleryModal';
// import AnalyticsModal from './AnalyticsModal';

// Interface for API response data
interface ServiceType {
    _id: string;
    name: string;
}

interface Booking {
    _id: string;
    clientName: string;
    serviceType: ServiceType; // <-- object instead of string
    date: string;
    time: string;
    status: string;
}
interface FullBookingDetails extends Booking {
    phone: string;
    brand: string;
    product: string;
    specialNotes: string;
    createdAt: string;
    updatedAt: string;
}

const AdminDashboard = () => {
    const [bookings, setBookings] = useState<FullBookingDetails[]>([]);
    const [stats, setStats] = useState({
        totalUsers: '...',
        totalBookings: '...',
        upcomingMeetings: '...',
        mostPopularService: '...'
    });
    const [loading, setLoading] = useState(true);
    const bookingsTableRef = useRef(null);
    const [selectedBooking, setSelectedBooking] = useState<FullBookingDetails | null>(null);
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const [showUploadGalleryModal, setShowUploadGalleryModal] = useState(false);
    const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    // Function to fetch all data
    const fetchData = async () => {
        try {
            // Fetch stats from the correct API endpoint
            const statsRes = await fetch("/api/Admin/sataes", { cache: "no-store" });
            const statsData = await statsRes.json();

            // Fetch all bookings from the correct API endpoint
            const bookingsRes = await fetch("/api/bookings/get_all", { cache: "no-store" });
            const bookingsData = await bookingsRes.json();

            // Filter out 'canceled' bookings before setting state
            const fetchedBookings = bookingsData.success
                ? bookingsData.data.filter((b: FullBookingDetails) => b.status.toLowerCase() !== 'canceled')
                : [];
            setBookings(fetchedBookings);

            if (statsData.success) {
                const popularService = statsData.data.popularServices && statsData.data.popularServices.length > 0
                    ? statsData.data.popularServices[0].serviceName
                    : 'N/A';

                setStats({
                    totalUsers: statsData.data.totalUsers.toLocaleString(),
                    totalBookings: statsData.data.totalBookings.toLocaleString(),
                    upcomingMeetings: statsData.data.upcomingThisMonth.toLocaleString(),
                    mostPopularService: popularService
                });
            } else {
                console.error("Failed to fetch admin stats:", statsData.message);
            }

        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            // Handle error state
        } finally {
            setLoading(false);
        }
    };

    // Use a single useEffect for all data fetching and polling
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    const handleViewDetails = (booking: FullBookingDetails) => {
        setSelectedBooking(booking);
    };

    const getStatusClasses = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
            case 'completed':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
            case 'in progress':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
            case 'canceled':
                return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const statCards = [
        { title: 'Total Users', value: stats.totalUsers },
        { title: 'Total Bookings', value: stats.totalBookings },
        { title: 'Upcoming Meetings', value: stats.upcomingMeetings },
        { title: 'Most Popular Service', value: stats.mostPopularService }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <p className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 font-sans">
            <motion.header
                className="mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Manage your restoration business efficiently
                </p>
            </motion.header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            {stat.title}
                        </h3>
                        <div className="flex items-center justify-between">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Bookings Section */}
            <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Recent Bookings
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
                                <th className="py-3 px-4">Client Name</th>
                                <th className="py-3 px-4">Service</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Time</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            ref={bookingsTableRef}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.05 } }
                            }}
                        >
                            {bookings.slice(0, 10).map((booking) => (
                                <motion.tr
                                    key={booking._id}
                                    className="border-b border-gray-100 dark:border-gray-800"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{booking.clientName}</td>
                                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{booking.serviceType.name}</td>
                                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{new Date(booking.date).toLocaleDateString()}</td>
                                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{booking.time}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => handleViewDetails(booking as FullBookingDetails)}
                                            className="text-blue-500 hover:underline font-medium"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <div className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Add New Service
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Create a new restoration service
                    </p>
                    <button onClick={() => setShowAddServiceModal(true)} className="btn-primary w-full bg-fawn text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-fawn-dark transition-all duration-300">Add Service</button>
                </div>
                <div className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Upload Gallery
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Add new before/after images
                    </p>
                    <button onClick={() => setShowUploadGalleryModal(true)} className="btn-primary w-full bg-fawn text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-fawn-dark transition-all duration-300">Upload Images</button>
                </div>
                <div className="card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        View Analytics
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Check business performance
                    </p>
                    <button onClick={() => setShowAnalyticsModal(true)} className="btn-primary w-full bg-fawn text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-fawn-dark transition-all duration-300">View Analytics</button>
                </div>
            </motion.div>

            {selectedBooking && <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} onUpdate={fetchData} />}
            {showAddServiceModal && <AddServiceModal onClose={() => { setShowAddServiceModal(false); fetchData(); }} />}
            {showUploadGalleryModal && <UploadGalleryModal onClose={() => setShowUploadGalleryModal(false)} />}
            {/* {showAnalyticsModal && <AnalyticsModal onClose={() => setShowAnalyticsModal(false)} pieData={pieChartData} barData={barChartData} />} */}
        </div>
    );
};

export default AdminDashboard;
