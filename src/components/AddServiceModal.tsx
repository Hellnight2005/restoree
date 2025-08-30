"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

interface AddServiceModalProps {
    onClose: () => void;
}

interface ServiceForm {
    name: string;
    price: string;
    duration: string;
    description: string;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<ServiceForm>({
        name: '',
        price: '',
        duration: '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(modalRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.9,
        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const res = await fetch("/api/Service/create_service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseInt(formData.price),
                    duration: parseInt(formData.duration),
                    description: formData.description,
                }),
            });

            if (res.ok) {
                setMessage("Service added successfully!");
                setTimeout(onClose, 1500);
            } else {
                const errorData = await res.json();
                setMessage(`Failed to add service: ${errorData.message}`);
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <motion.div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add New Service</h2>
                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm text-center ${message.includes('Failed') || message.includes('error') ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Service'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddServiceModal;
