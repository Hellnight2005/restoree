"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface UploadGalleryModalProps {
    onClose: () => void;
}

const UploadGalleryModal: React.FC<UploadGalleryModalProps> = ({ onClose }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        setIsUploading(true);
        setMessage('');

        const formData = new FormData();
        formData.append('image', file);

        try {
            // Assuming an API endpoint like `/api/gallery/upload` exists
            const res = await fetch("/api/gallery/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setMessage("Image uploaded successfully!");
                setFile(null);
                setTimeout(onClose, 1500);
            } else {
                const errorData = await res.json();
                setMessage(`Failed to upload image: ${errorData.message}`);
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50 p-4">
            <motion.div
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upload Gallery Image</h2>
                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-sm text-center ${message.includes('Failed') || message.includes('error') ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200' : 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full text-gray-900 dark:text-white p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                            accept="image/*"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default UploadGalleryModal;
