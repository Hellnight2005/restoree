// components/ShippingAndDelivery.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin (required for scroll-based animations)
gsap.registerPlugin(ScrollTrigger);

const ShippingAndDelivery = () => {
    // State to manage the theme, initialized from local storage
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark';
        }
        return false;
    });

    const sectionsRef = useRef<HTMLDivElement[]>([]);

    // Function to add a ref to the array
    const sectionRefs = (el: HTMLDivElement) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    // GSAP animations for sections
    useEffect(() => {
        sectionsRef.current.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, []);

    // Effect to persist theme in local storage
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="min-h-screen">
            {/* The main container for both light and dark themes */}
            <div className="container mx-auto px-4 py-16 bg-sand-light dark:bg-dark-bg transition-colors duration-500">
                <div className="max-w-4xl mx-auto">
                    {/* Theme Toggle Button */}
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-sand-medium dark:bg-dark-card text-gray-800 dark:text-gray-200 transition-colors duration-300 shadow-md"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0015.354 20.354z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <h1 className="text-5xl font-bold mb-10 text-center text-fawn dark:text-gold-dark transition-colors duration-300">
                        Shipping & Delivery Policy
                    </h1>

                    <div className="space-y-8">
                        {/* Section 1: Service Coverage */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Courier icon for Service Coverage */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                1. Service Coverage
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum">
                                Réstorée currently provides pick-up and delivery services within Mumbai city.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum mt-4">
                                <li>For outstation deliveries or courier arrangements, service availability will be confirmed at the time of order.</li>
                            </ul>
                        </section>

                        {/* Section 2: Pick-Up of Items */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Box icon for Pick-up of Items */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9-4h4"></path></svg>
                                2. Pick-Up of Items
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Customers must ensure items are securely packed (if courier pick-up is used).</li>
                                <li>At the time of pick-up, customers will receive a receipt/order confirmation specifying the items collected and the services requested.</li>
                                <li>Réstorée is not responsible for items that are not clearly mentioned at the time of handover.</li>
                            </ul>
                        </section>

                        {/* Section 3: Delivery of Items */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Clock icon for Delivery of Items */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                3. Delivery of Items
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Delivery timelines will vary depending on the nature of the service (cleaning, restoration, re-colouring, repairs, personalisation).</li>
                                <li>An estimated delivery date will be provided at the time of order confirmation.</li>
                                <li>Delays may occur due to unforeseen circumstances (e.g., supply of materials, complex repairs, or courier issues). Customers will be notified in such cases.</li>
                            </ul>
                        </section>

                        {/* Section 4: Courier & Third-Party Services */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Truck icon for Courier & Third-Party Services */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-3-3m3 3l-3 3m-4 3v4a2 2 0 002 2h5.586a1 1 0 00.707-.293l5.414-5.414a1 1 0 00-.707-1.707l-5.414 5.414a1 1 0 00-.707.293V10a2 2 0 00-2-2z"></path></svg>
                                4. Courier & Third-Party Services
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>For deliveries outside our direct service area, Réstorée may use third-party courier partners.</li>
                                <li>While we ensure items are packaged securely, Réstorée will not be liable for delays, damage, or loss caused during transit by third-party couriers.</li>
                                <li>Customers are encouraged to opt for insured shipping when using courier services for high-value items.</li>
                            </ul>
                        </section>

                        {/* Section 5: Delivery Attempts */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Map marker icon for Delivery Attempts */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657l-4.243 4.243a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                5. Delivery Attempts
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Customers must provide accurate delivery addresses and contact information.</li>
                                <li>If delivery is attempted and fails due to incorrect details or unavailability, additional delivery charges may apply.</li>
                            </ul>
                        </section>

                        {/* Section 6: Uncollected Items */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Box with arrow icon for Uncollected Items */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2m0-6V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6m0 0l-2 2m2-2l2 2m-2-2l-2-2m4 2a2 2 0 01-2-2"></path></svg>
                                6. Uncollected Items
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Customers must collect their items within 30 days of service completion.</li>
                                <li>Réstorée will attempt to contact customers, but items uncollected beyond 90 days may be considered abandoned and may be disposed of without liability.</li>
                            </ul>
                        </section>

                        {/* Section 7: Liability */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Shield icon for Liability */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                7. Liability
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Réstorée takes every precaution to ensure safe handling of items during pick-up, service, and delivery.</li>
                                <li>In the unlikely event of damage or loss caused directly by Réstorée, the company’s liability will be limited to five (5) times the value of the service charge paid for that article, in accordance with our Refund & Cancellation Policy.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingAndDelivery;