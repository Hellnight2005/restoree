"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Interfaces
interface ServiceType {
    _id: string;
    name: string;
}

interface FullBookingDetails {
    _id: string;
    clientName: string;
    phone: string;
    brand: string;
    product: string;
    specialNotes: string;
    serviceType: ServiceType; // Corrected to be an object
    date: string;
    time: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface BookingDetailsModalProps {
    booking: FullBookingDetails;
    onClose: () => void;
    onUpdate: () => void;
}

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

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({ booking, onClose, onUpdate }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState('');

    const handleStatusUpdate = async (newStatus: 'confirmed' | 'canceled') => {
        setIsUpdating(true);
        setMessage('');

        try {
            const res = await fetch(`/api/bookings/${booking._id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newStatus }),
            });

            if (res.ok) {
                setMessage(`Status updated to ${newStatus} successfully!`);
                onUpdate(); // Trigger parent component to re-fetch data
                setTimeout(onClose, 1000); // Close modal after 1 second
            } else {
                const errorData = await res.json();
                setMessage(`Failed to update status: ${errorData.message}`);
            }
        } catch (error) {
            setMessage('An unexpected error occurred. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Booking Details</h2>
                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm text-center ${message.includes('Failed') || message.includes('error') ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'}`}>
                        {message}
                    </div>
                )}
                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                    <p><span className="font-medium">Client Name:</span> {booking.clientName}</p>
                    <p><span className="font-medium">Service:</span> {booking.serviceType.name}</p>
                    <p><span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {booking.time}</p>
                    <p><span className="font-medium">Phone:</span> {booking.phone}</p>
                    <p><span className="font-medium">Brand:</span> {booking.brand}</p>
                    <p><span className="font-medium">Product:</span> {booking.product}</p>
                    <p><span className="font-medium">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(booking.status)}`}>
                            {booking.status}
                        </span>
                    </p>
                    {booking.specialNotes && (
                        <p><span className="font-medium">Notes:</span> {booking.specialNotes}</p>
                    )}

                </div>
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => handleStatusUpdate('confirmed')}
                        className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                    <button
                        onClick={() => handleStatusUpdate('canceled')}
                        className="flex-1 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Canceling...' : 'Cancel Booking'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingDetailsModal;
