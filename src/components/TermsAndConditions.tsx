// components/TermsContent .tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin (required for scroll-based animations)
gsap.registerPlugin(ScrollTrigger);

const TermsContent = () => {
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
                        Terms & Conditions
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Section 1: General */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                📜&nbsp;1. General
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum">
                                Welcome to Réstorée. By accessing or using our website and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before engaging with our services.
                            </p>
                        </section>

                        {/* Section 2: Services */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                🛠️&nbsp;2. Services
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Réstorée specializes in cleaning, restoration, re-colouring, repair, personalisation, and care for sneakers, bags, leather goods, furniture, and automobile interiors.</li>
                                <li>All services are carried out by trained professionals using premium products and techniques.</li>
                                <li>Service timelines may vary depending on the condition, material, and complexity of the item.</li>
                            </ul>
                        </section>

                        {/* Section 3: Customer Responsibility */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                🤝&nbsp;3. Customer Responsibility
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Customers are responsible for providing accurate information regarding the condition of items.</li>
                                <li>Réstorée does not take responsibility for pre-existing damages, weakened fabrics, hidden defects, or color/material inconsistencies caused by prior treatments.</li>
                                <li>Customers must collect their items within 30 days of service completion. Items not collected within 90 days may be disposed of without further notice.</li>
                            </ul>
                        </section>

                        {/* Section 4: Payments & Pricing */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                💳&nbsp;4. Payments & Pricing
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Prices for services will be provided prior to acceptance of an item.</li>
                                <li>Payments must be made in full before item collection or delivery unless otherwise agreed.</li>
                                <li>Prices are subject to change without prior notice.</li>
                            </ul>
                        </section>

                        {/* Section 5: Liability */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                ⚖️&nbsp;5. Liability
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>While every care is taken, Réstorée cannot be held liable for:
                                    <ul className="list-circle list-inside ml-8 space-y-2">
                                        <li>Natural wear and tear or age-related deterioration.</li>
                                        <li>Color variations due to fabric/leather limitations.</li>
                                        <li>Accessories/materials that react unpredictably to cleaning/restoration processes.</li>
                                    </ul>
                                </li>
                                <li>Maximum liability, if proven, will be limited to the service cost paid by the customer.</li>
                            </ul>
                        </section>

                        {/* Section 6: Personalisation Services */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                🎨&nbsp;6. Personalisation Services
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Personalisation (e.g., monograms, anime characters, custom designs) is carried out based on customer approval.</li>
                                <li>Once approved, personalised items are non-refundable and non-exchangeable.</li>
                            </ul>
                        </section>

                        {/* Section 7: Cancellations & Refunds */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                ❌&nbsp;7. Cancellations & Refunds
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Cancellation requests must be made within 24 hours of placing a service order.</li>
                                <li>Services that have already commenced cannot be cancelled or refunded.</li>
                                <li>Refunds, if applicable, will be processed within 7–10 business days.</li>
                            </ul>
                        </section>

                        {/* Section 8: Intellectual Property */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                🧠&nbsp;8. Intellectual Property
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum">
                                All content, logos, and designs displayed on Réstorée’s website remain the intellectual property of Restoree and cannot be copied, reproduced, or used without written permission.
                            </p>
                        </section>

                        {/* Section 9: Privacy & Data Protection */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                🔒&nbsp;9. Privacy & Data Protection
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Customer details provided to Restoree are used solely for service delivery and communication purposes.</li>
                                <li>Réstorée does not share or sell customer information with third parties.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsContent;