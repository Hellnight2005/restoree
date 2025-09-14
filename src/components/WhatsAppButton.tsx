// src/components/WhatsAppButton.tsx
"use client";

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton: React.FC = () => {
    // Define the phone number and message directly
    const phoneNumber = "917977186066";
    const message = "Hello, I'm interested in your service. Could you please provide more information?";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat on WhatsApp"
        >
            <div
                className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center
                   bg-platinum border-2 border-fawn text-fawn
                   dark:bg-gray-800 dark:border-fawn dark:text-fawn
                   overflow-hidden shadow-lg group-hover:shadow-2xl
                   transition-all duration-300 ease-in-out"
            >
                {/* Background fill-up effect */}
                <div
                    className="absolute inset-0 bg-fawn transform scale-0 group-hover:scale-100
                     rounded-full transition-transform duration-300 ease-out origin-center"
                ></div>

                {/* WhatsApp Icon */}
                <FaWhatsapp
                    className="relative z-10 w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9
                     group-hover:text-white group-hover:scale-110
                     transition-all duration-300 ease-in-out"
                />
            </div>
        </a>
    );
};

export default WhatsAppButton;