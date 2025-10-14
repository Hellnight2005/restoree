"use client";

import { motion } from "framer-motion";

export default function ContactContent() {
    return (
        <div className="min-h-screen">
            <section className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
                        style={{
                            backgroundImage: "url('/images/workshop-tools.jpg')",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1
                        className="font-copperplate text-5xl md:text-7xl font-bold mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-serif"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Ready to restore your treasures? Let's start the conversation
                    </motion.p>
                </div>
            </section>

            <section className="section-padding bg-white dark:bg-dark-bg">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            className="bg-anti-flash dark:bg-gray-800 p-8 rounded-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                                Book a Consultation
                            </h3>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fawn focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fawn focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fawn focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fawn focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />

                                <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fawn focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                    <option>Select a service</option>
                                    <option>Bag Restoration</option>
                                    <option>Shoe Polishing</option>
                                    <option>Leather Repair</option>
                                </select>

                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your restoration needs..."
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-fawn focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />

                                <motion.button
                                    type="submit"
                                    className="w-full btn-primary text-lg py-4"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Book Consultation
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
