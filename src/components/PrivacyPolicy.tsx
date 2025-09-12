// components/PrivacyPolicy.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin (required for scroll-based animations)
gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicy = () => {
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
                        Privacy Policy
                    </h1>

                    {/* Change grid to vertical stack */}
                    <div className="space-y-8">
                        {/* Section 1: Introduction */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Classic icon for Introduction: Document */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                1. Introduction
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum">
                                At Réstorée, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum mt-4">
                                By accessing our website or submitting personal information, you agree to the practices described in this policy.
                            </p>
                        </section>

                        {/* Section 2: Information We Collect */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Classic icon for Information We Collect: User with lock */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                2. Information We Collect
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum mb-4">
                                We may collect the following types of information:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li><strong>Personal Information:</strong> Name, email, phone number, address, billing details.</li>
                                <li><strong>Service Information:</strong> Details of items submitted for cleaning, restoration, re-colouring, repairs, or personalisation.</li>
                                <li><strong>Website Usage Data:</strong> IP addresses, browser type, device details, cookies, and browsing activity.</li>
                            </ul>
                        </section>

                        {/* Section 3: How We Use Your Information */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Classic icon for How We Use Your Information: Lightbulb */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.674M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                3. How We Use Your Information
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum mb-4">
                                Your information is used for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Processing service orders and delivering items.</li>
                                <li>Communicating updates about your order, promotions, or offers.</li>
                                <li>Improving our website, services, and customer experience.</li>
                                <li>Ensuring security and preventing fraudulent activities.</li>
                            </ul>
                            <p className="text-lg leading-relaxed font-bold text-gray-800 dark:text-platinum mt-4">
                                We do not sell, rent, or trade your personal information to third parties.
                            </p>
                        </section>

                        {/* Section 4: Sharing of Information */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Classic icon for Sharing of Information: Handshake */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3V5a3 3 0 00-3-3m-3 3v3a3 3 0 003 3h3m2 2h-4a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2a2 2 0 00-2-2z"></path></svg>
                                4. Sharing of Information
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum mb-4">
                                We may share information only in the following cases:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>With trusted service providers (e.g., payment processors, delivery partners).</li>
                                <li>If required by law, regulation, or legal proceedings.</li>
                                <li>To protect the rights, property, or safety of Réstorée, our customers, or the public.</li>
                            </ul>
                        </section>

                        {/* Section 5: Cookies & Tracking Technologies */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Classic icon for Cookies: Cookie icon */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                5. Cookies & Tracking Technologies
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum mb-4">
                                Our website uses cookies and tracking technologies to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>Enhance browsing experience.</li>
                                <li>Remember user preferences.</li>
                                <li>Monitor website traffic and analytics.</li>
                            </ul>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum mt-4">
                                You can disable cookies in your browser settings, but this may affect website functionality.
                            </p>
                        </section>

                        {/* Section 6: Data Retention */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Classic icon for Data Retention: Hard drive */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1m-7 6h7m-7-3h7m-6 3l-1.5-1.5L13 9.5M10 20a2 2 0 002 2h2a2 2 0 002-2v-2h-6v2z"></path></svg>
                                6. Data Retention
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-lg text-gray-800 dark:text-platinum">
                                <li>We retain personal data only as long as necessary to provide services and comply with legal obligations.</li>
                                <li>Customers may request deletion of personal data (subject to legal or regulatory requirements).</li>
                            </ul>
                        </section>

                        {/* Section 7: Changes to This Policy */}
                        <section
                            ref={sectionRefs}
                            className="bg-sand-medium dark:bg-dark-card p-8 rounded-lg shadow-md border-t-4 border-fawn dark:border-gold-medium transition-colors duration-300"
                        >
                            <h2 className="text-3xl font-semibold mb-4 text-fawn dark:text-gold-medium flex items-center">
                                {/* Classic icon for Changes: Refresh/Update */}
                                <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11.516 2.516l-1.571-1.571m1.571 1.571l1.571 1.571m-2.912-1.516a8.001 8.001 0 01-14.249 2.766M9 14.5a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                7. Changes to This Policy
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-800 dark:text-platinum">
                                Réstorée reserves the right to update or modify this Privacy Policy at any time. Updates will be posted on this page with a revised “Last Updated” date.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;