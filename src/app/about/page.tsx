"use client"

import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
                                style={{
                      backgroundImage: "url('/images/about-bg.jpg')"
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
            About Réstorée
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where tradition meets innovation in luxury restoration
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-serif leading-relaxed">
                To preserve the beauty, functionality, and emotional value of luxury items 
                through expert craftsmanship and innovative restoration techniques.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-anti-flash dark:bg-gray-800 p-8 rounded-2xl">
                <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Our Vision
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-serif leading-relaxed">
                  To become the world's most trusted name in luxury restoration, 
                  setting new standards for quality and craftsmanship.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Audience & Tone */}
      <section className="section-padding bg-anti-flash dark:bg-dark-card">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-serif max-w-3xl mx-auto">
              Discerning clients who value heritage, detail, and longevity over disposability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Luxury Enthusiasts', desc: 'Owners of premium bags, shoes, and accessories seeking expert care.' },
              { title: 'Collectors & Curators', desc: 'Archival, museum, and private collections requiring conservation.' },
              { title: 'Boutique Resellers', desc: 'Trusted partners who prepare items for resale with integrity.' },
              { title: 'Heritage Keepers', desc: 'Families preserving heirlooms across generations.' }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className="card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <h3 className="font-copperplate text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-serif">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-copperplate text-3xl font-bold text-gray-900 dark:text-white">
              Tone of Voice
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Elegant', desc: 'Refined language that respects the brands we service.' },
              { title: 'Assured', desc: 'Confident expertise, never boastful.' },
              { title: 'Discreet', desc: 'Privacy-first approach with white-glove service.' },
              { title: 'Craft-led', desc: 'We highlight method and material—not hype.' }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <p className="text-fawn text-sm uppercase tracking-wider mb-2">Principle</p>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 font-serif">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Timeline */}
      <section className="section-padding bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <motion.h2
            className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-10">
              {[
                { year: '2018', title: 'Foundation', desc: 'Réstorée is founded to elevate restoration to luxury service standards.' },
                { year: '2019', title: 'Studio Opening', desc: 'First atelier opens with specialized leather and hardware benches.' },
                { year: '2021', title: 'Trusted Partnerships', desc: 'Boutique resellers and collectors begin long-term collaborations.' },
                { year: '2023', title: 'Advanced Color Lab', desc: 'In-house color library and matching system introduced.' },
                { year: '2024', title: 'Global Clientele', desc: 'Remote consultation and concierge logistics available worldwide.' }
              ].map((item, idx) => (
                <motion.div
                  key={item.year}
                  className={`relative md:flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-6`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                >
                  <div className="relative z-10 bg-fawn text-white rounded-full w-8 h-8 flex items-center justify-center md:mx-6 shadow-md">
                    <span className="text-sm font-semibold">{item.year.slice(2)}</span>
                  </div>
                  <div className="card p-6 flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-serif">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="section-padding bg-anti-flash dark:bg-dark-card">
        <div className="container-custom">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              The Réstorée Method
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-serif max-w-3xl mx-auto">
              A meticulous, materials-first approach refined through thousands of restorations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Assessment', desc: 'Brand-specific evaluation of condition, construction, and materials.' },
              { step: '02', title: 'Preparation', desc: 'Gentle cleaning and surface prep to ensure optimal adhesion and finish.' },
              { step: '03', title: 'Restoration', desc: 'Precision repair, color work, and hardware servicing by specialists.' },
              { step: '04', title: 'Finishing', desc: 'Protective coatings, conditioning, and quality checks for longevity.' }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <span className="absolute -top-4 -right-2 text-7xl font-bold text-gray-100 dark:text-gray-700 select-none">
                  {item.step}
                </span>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 font-serif">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 font-serif">
              By appointment only. White-glove pickup and insured return available.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
