"use client"

import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section (dark for contrast) */}
      <section className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: "url('/images/Aout_main.jpg')"
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
            Where tradition meets innovation in luxury restoration.
          </motion.p>
        </div>
      </section>

      {/* 2. Our Story - First main content section, using bg-sand-light and dark:bg-gray-800 */}
      <section id="our-story" className="section-padding bg-sand-light dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-serif leading-relaxed max-w-4xl mx-auto">
              Formerly known as The Laundry Company, we have evolved into RÉSTORÉE, a brand synonymous with Premium Sneaker and Bag Spa services. Over the years, we have built our reputation through a strong focus on quality, precision, and customer trust.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-serif leading-relaxed max-w-4xl mx-auto">
              The name RÉSTORÉE reflects our philosophy — to <strong>Redefine</strong> luxury care at every step. RÉ stands for everything we do: Re-juvenate, Re-store, Re-color, Re-vamp, Re-stitch, Re-new, Re-bind, Re-hydrate, Re-condition, Re-buckle, Re-attach, Re-heel, Re-finish, and Re-zip. Every service is designed to breathe new life into your prized possessions — keeping them timeless, stylish, and truly yours.
            </p>
            <p className="text-center text-fawn font-bold text-2xl font-copperplate">
              ✨ RÉSTORÉE — Revive your Vibe!
            </p>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 font-serif leading-relaxed max-w-4xl mx-auto text-center">
              Our team consists of highly trained professionals with a cumulative experience of more than 20 years in premium dry cleaning and luxury care. Having successfully serviced over 10,000 articles, we have continually refined our expertise to set new benchmarks in the industry.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 font-serif leading-relaxed max-w-4xl mx-auto text-center">
              At RÉSTORÉE, we are equipped with a blend of modern technology, updated premium products, and highly skilled craftsmen to cater to all your luxury restoration requirements. We proudly uphold global standards and techniques in professional sneaker cleaning, bag cleaning, and complete restoration services, ensuring every item is treated with the highest level of care and craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Mission & Vision - Second section, using bg-sand-medium and dark:bg-gray-900 */}
      <section className="section-padding bg-sand-medium dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8">
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
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl">
                <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
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

      {/* 4. Audience & Tone - Third section, using bg-sand-light and dark:bg-gray-800 */}
      <section className="section-padding bg-sand-light dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
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
                <h3 className="font-copperplate text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
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
            <h3 className="font-copperplate text-3xl font-bold text-gray-900 dark:text-gray-100">
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
                className="p-6 rounded-2xl bg-anti-flash dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <p className="text-fawn text-sm uppercase tracking-wider mb-2">Principle</p>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 font-serif">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Meet Our Founders - A deeper shade for the founder's section, using bg-sand-medium and dark:bg-gray-900 */}
      <section className="section-padding bg-sand-medium dark:bg-gray-900">
        <div className="container-custom">
          <motion.h2
            className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Founders
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Nitika Shaikh */}
            <motion.div
              className="flex flex-col items-center text-center p-6 card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Nitika Shaikh
              </h3>
              <p className="text-fawn font-semibold mb-4">
                Co-Founder & Head of Marketing & Operations
              </p>
              <p className="text-gray-600 dark:text-gray-300 font-serif">
                With over 20 years of experience in the media & fashion industry, Nitika brings expertise in brand strategy, digital advertising, and business development. As COO of The Laundry Company, she was instrumental in building the brand’s reputation for superior service and customer satisfaction. Today, she is the driving force behind the transition into Réstorée, leading marketing and operations with a focus on global standards and innovation.
              </p>
              <a href="#" className="mt-4 text-fawn font-semibold hover:underline">
                Read More
              </a>
            </motion.div>

            {/* Nadeem Shaikh */}
            <motion.div
              className="flex flex-col items-center text-center p-6 card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Nadeem Shaikh
              </h3>
              <p className="text-fawn font-semibold mb-4">
                Co-Founder, CFO & Head of Operations
              </p>
              <p className="text-gray-600 dark:text-gray-300 font-serif">
                Coming from a strong background in the telecom & fashion industry, Nadeem has over 20 years of experience in business scaling, human resources, and technology leadership. As Co-Founder of The Laundry Company, he was key to scaling operations and keeping the brand technologically ahead of its competitors. At Réstorée, he now leads as CFO & Operations Head, combining financial planning and operational efficiency to strengthen the brand’s presence.
              </p>
              <a href="#" className="mt-4 text-fawn font-semibold hover:underline">
                Read More
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. The Réstorée Method (Craftsmanship Process) - Fourth section, using bg-sand-light and dark:bg-gray-800 */}
      <section className="section-padding bg-sand-light dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
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
                className="p-6 rounded-2xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <span className="absolute -top-4 -right-2 text-7xl font-bold text-gray-100 dark:text-gray-700 select-none">
                  {item.step}
                </span>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 font-serif">{item.desc}</p>
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

      {/* 7. Brand Timeline (Our Journey) - Fifth section, using bg-sand-medium and dark:bg-gray-900 */}
      <section className="section-padding bg-sand-medium dark:bg-gray-700">
        <div className="container-custom">
          <motion.h2
            className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-400 dark:bg-gray-600" />
            <div className="space-y-10">
              {[
                { year: '2015', title: 'The Laundry Company Foundation', desc: 'The original brand is established with a focus on premium dry cleaning and service.' },
                { year: '2017', title: 'Pioneering Luxury Care', desc: 'We expand our services to specialize in premium sneaker and bag spa treatments.' },
                { year: '2019', title: 'Advanced Studio & Training', desc: 'The team undergoes advanced leather restoration training with a UK-based institute.' },
                { year: '2023', title: 'The Birth of Réstorée', desc: 'The brand evolves into Réstorée to reflect a new identity focused on luxury restoration.' },
                { year: '2025', title: 'Global Reach', desc: 'Expanding our services to include professional restoration for all types of leather and fabric products.' }
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
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 font-serif">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage