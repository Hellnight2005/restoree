// components/RefundsAndCancellations.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// Import Lucide-React icons
import { XCircle, DollarSign, Paintbrush, ShieldHalf, Box } from 'lucide-react';


// Register ScrollTrigger plugin (required for scroll-based animations)
gsap.registerPlugin(ScrollTrigger);

const RefundsAndCancellations = () => {
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
                        Refund & Cancellation Policy
                    </h1>

                    <div className="space-y-8">
                        {/* Section 1: Cancellations */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                <XCircle className="w-8 h-8 mr-2" /> {/* Changed icon */}
                                1. Cancellations
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Customers may cancel a service request within **24 hours** of placing the order.</li>
                                <li>Once the service has commenced, cancellations will not be accepted.</li>
                                <li>For pick-up/drop-off services, cancellation must be requested before collection of the item.</li>
                            </ul>
                        </section>

                        {/* Section 2: Refunds */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                <DollarSign className="w-8 h-8 mr-2" /> {/* Changed icon */}
                                2. Refunds
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Services are non-refundable once work has started, as each process involves customised treatments.</li>
                                <li>In rare cases where service is not possible, Réstorée may offer a partial or full refund at its sole discretion.</li>
                                <li>Refunds, if approved, will be processed to the original payment method within **7–10 business days**.</li>
                            </ul>
                        </section>

                        {/* Section 3: Personalisation Services */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                <Paintbrush className="w-8 h-8 mr-2" /> {/* Changed icon */}
                                3. Personalisation Services
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Personalised items are non-cancellable and non-refundable once approved by the customer.</li>
                                <li>Customers are required to review and confirm all design approvals before work begins.</li>
                            </ul>
                        </section>

                        {/* Section 4: Quality Assurance & Liability */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                <ShieldHalf className="w-8 h-8 mr-2" /> {/* Changed icon */}
                                4. Quality Assurance & Liability
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Réstorée ensures all services are carried out by trained professionals.</li>
                                <li>Customers are requested to inspect their items at the time of collection/delivery. Any concerns must be raised immediately.</li>
                                <li>After delivery/collection, Réstorée will not be held responsible for issues arising from misuse or improper storage.</li>
                                <li>In the unlikely event of damage or loss caused solely by Réstorée, liability will be limited to **five (5) times** the service charge.</li>
                            </ul>
                        </section>

                        {/* Section 5: Uncollected Items */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                <Box className="w-8 h-8 mr-2" /> {/* Changed icon */}
                                5. Uncollected Items
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum">
                                Customers must collect their items within <strong>30 days </strong> of service completion.
                                Réstorée will attempt to contact customers, but items uncollected beyond <strong>90 days</strong> may be disposed of without liability.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundsAndCancellations;