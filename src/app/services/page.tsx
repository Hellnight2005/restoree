"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, Clock, ArrowRight, MessageCircle } from 'lucide-react';

const services = [
  {
    id: 'cleaning',
    title: 'Cleaning & Spa Treatments',
    description: 'Give your luxury pieces a fresh lease on life. We specialize in professional sneaker and bag spa treatments, using premium, safe-grade products to remove dirt and stains while preserving the original finish.',
    process: [
      'Thorough assessment and evaluation',
      'Deep cleaning with specialized, brand-safe solutions',
      'Gentle stain removal and spot treatment',
      'Conditioning to restore suppleness',
      'Final polishing and protective coating application'
    ],
    benefits: ['Brand-safe methods', 'Preserves original texture', 'Protects against future stains'],
    timeline: '2-5 days',
    image: '/images/service-cleaning.jpg',
    previewBefore: '/images/before-after-1.jpg',
    previewAfter: '/images/before-after-2.jpg'
  },
  {
    id: 'restoration',
    title: 'Restoration',
    description: 'Revive the old and renew the worn. Our restoration services breathe life back into well-loved sneakers, handbags, and leather goods, making your timeless pieces look and feel like new.',
    process: [
      'Detailed material inspection',
      'Correction of scuffs and abrasions',
      'Precision patching for tears and holes',
      'Surface refinishing for a seamless look',
      'Protective sealing to prevent future damage'
    ],
    benefits: ['Invisible mends', 'Restored structural integrity', 'Flawless aesthetic appearance'],
    timeline: '4-7 days',
    image: '/images/service-restoration.jpg',
    previewBefore: '/images/before-after-2.jpg',
    previewAfter: '/images/before-after-3.jpg'
  },
  {
    id: 're-colouring',
    title: 'Re-Colouring',
    description: 'When colors fade, we bring them back to life. Using advanced methods and premium pigments, our re-colouring service restores vibrancy and uniformity to leather and fabric items.',
    process: [
      'Color analysis and swatching',
      'Thorough surface preparation and masking',
      'Expert application of layered pigment',
      'Curing to ensure color durability',
      'Finish selection (matte, satin, or gloss) and final protection'
    ],
    benefits: ['Perfectly accurate color matching', 'Vibrant and long-lasting finish', 'Can transform an item’s look'],
    timeline: '4-6 days',
    image: '/images/service-recolouring.jpg',
    previewBefore: '/images/before-after-3.jpg',
    previewAfter: '/images/before-after-1.jpg'
  },
  {
    id: 'repairs',
    title: 'Repairs',
    description: 'Our craftsmen handle every detail with care, from stitching and zipper replacements to patching and sole repairs. We ensure your item remains both functionally strong and aesthetically flawless.',
    process: [
      'Component identification and sourcing',
      'Precision removal of damaged parts',
      'Expert fitting of new components',
      'Stitching and structural reinforcement',
      'Durability testing to ensure smooth operation'
    ],
    benefits: ['Smooth operation of hardware', 'Reinforced structural integrity', 'Finish-matched parts for a cohesive look'],
    timeline: '3-5 days',
    image: '/images/service-repairs.jpg',
    previewBefore: '/images/before-after-1.jpg',
    previewAfter: '/images/before-after-2.jpg'
  },
  {
    id: 'personalisation',
    title: 'Personalisation',
    description: 'Make it uniquely yours. Our artists transform your essentials into true statement pieces by adding custom initials, designs, or monograms to sneakers and bags.',
    process: [
      'Consultation to discuss your vision',
      'Creation of a custom design plan',
      'Precision application of your chosen design',
      'Finishing and sealing to ensure durability',
      'Final quality check and delivery'
    ],
    benefits: ['Unique, one-of-a-kind items', 'Elevates your favorite brand', 'Reflects your personal style'],
    timeline: '5-10 days',
    image: '/images/service-personalisation.jpg',
    previewBefore: '/images/before-after-2.jpg',
    previewAfter: '/images/before-after-3.jpg'
  },
  {
    id: 'home',
    title: 'Home Luxe Services',
    description: 'Restoration and repair services for your designer home furniture—whether leather, suede, or bouclé. We restore elegance and durability to your interiors, ensuring your furniture retains its luxury finish.',
    process: [
      'On-site or in-studio assessment',
      'Deep cleaning and stain removal',
      'Repair of tears, scratches, and damage',
      'Re-colouring and refinishing',
      'Application of protective treatments'
    ],
    benefits: ['Restores elegance and comfort', 'Extends the life of your furniture', 'Saves you from costly replacement'],
    timeline: 'Custom',
    image: '/images/service-home.jpg',
    previewBefore: '/images/before-after-3.jpg',
    previewAfter: '/images/before-after-1.jpg'
  },
  {
    id: 'luxe-drive',
    title: 'Luxe Drive Services',
    description: 'Redefining car luxury care. Our automobile services specialize in the restoration and repair of interior leather and fabric finishes, ensuring your car’s interior reflects premium care.',
    process: [
      'Detailed interior assessment',
      'Repair of seat tears and scuffs',
      'Reviving faded colors and textures',
      'Complete re-colouring for a new look',
      'Protective finish application'
    ],
    benefits: ['Restores a premium look and feel', 'Increases your vehicle’s value', 'Protects against wear and tear'],
    timeline: 'Custom',
    image: '/images/service-luxe-drive.jpg',
    previewBefore: '/images/before-after-1.jpg',
    previewAfter: '/images/before-after-2.jpg'
  },
];

const ServicesPage = () => {
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: "url('/images/hero-bg.jpg')"
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
            Expert Care for Your Treasures
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional restoration services that bring your luxury items back to life
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-sand-medium dark:bg-dark-bg">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, index) => {
              const prefilledMessage = `Hello, I'm interested in your ${service.title} service. Could you please provide more information?`;
              const whatsappLink = `https://wa.me/917977186066?text=${encodeURIComponent(prefilledMessage)}`;

              return (
                <motion.div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Service Image */}
                  <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <motion.div
                      className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </motion.div>
                  </div>

                  {/* Service Content */}
                  <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                      {service.title}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-serif leading-relaxed">
                      {service.description}
                    </p>

                    {/* Process Steps */}
                    <div className="mb-8">
                      <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        How It's Done
                      </h3>
                      <motion.ol
                        className="space-y-3"
                        variants={listVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                      >
                        {service.process.map((step, stepIndex) => (
                          <motion.li
                            key={stepIndex}
                            className="flex items-start space-x-3"
                            variants={itemVariants}
                          >
                            <span className="flex-shrink-0 w-6 h-6 bg-fawn text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-600 dark:text-gray-300 font-serif">
                              {step}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ol>
                    </div>

                    {/* Benefits */}
                    <motion.ul
                      className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
                      variants={listVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      {service.benefits.map((b: string) => (
                        <motion.li key={b} className="flex items-center space-x-2" variants={itemVariants}>
                          <CheckCircle className="w-5 h-5 text-fawn" />
                          <span className="text-gray-700 dark:text-gray-300 font-serif">{b}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* Mini Before/After Preview */}
                    <div className="mb-8 p-4 rounded-xl border border-white border-opacity-50 shadow-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl overflow-hidden border border-black border-opacity-70 shadow-md">
                          <img src={service.previewBefore} alt={`${service.title} before`} className="w-full h-32 object-cover" />
                          <div className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 bg-anti-flash dark:bg-gray-800">Before</div>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-black border-opacity-70 shadow-md">
                          <img src={service.previewAfter} alt={`${service.title} after`} className="w-full h-32 object-cover" />
                          <div className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 bg-anti-flash dark:bg-gray-800">After</div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Badge */}
                    <div className="inline-flex items-center space-x-2 bg-anti-flash dark:bg-gray-800 px-4 py-2 rounded-full mb-6">
                      <Clock className="w-4 h-4 text-fawn" />
                      <span className="text-fawn font-semibold">Typical completion:</span>
                      <span className="text-gray-700 dark:text-gray-300">{service.timeline}</span>
                    </div>

                    {/* Buttons Container */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Book a Consultation Button */}
                      <motion.div whileHover={{ x: 2 }}>
                        <Link
                          href={`/booking?service=${service.id}&title=${encodeURIComponent(service.title)}&description=${encodeURIComponent(service.description)}&image=${encodeURIComponent(service.image)}&price=${encodeURIComponent((service as any).price || '')}&duration=${encodeURIComponent((service as any).estimatedDuration || service.timeline)}`}
                          className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
                        >
                          Book This Service
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </motion.div>

                      {/* Chat on WhatsApp Button */}
                      <motion.div whileHover={{ x: 2 }}>
                        <a
                          href={whatsappLink}
                          className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Chat
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;