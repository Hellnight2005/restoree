"use client"

import { motion } from 'framer-motion'

const GalleryPage = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Luxury Bag Restoration',
      category: 'Bags',
      image: '/images/main_resto.jpg'
    },
    {
      id: 2,
      title: 'Designer Shoe Revival',
      category: 'Shoes',
      image: '/images/after_recolor.jpg'
    },
    {
      id: 3,
      title: 'Leather Jacket Transformation',
      category: 'Leather',
      image: '/images/Leather_tran.jpg'
    },
    {
      id: 4,
      title: 'Vintage Purse Restoration',
      category: 'Bags',
      image: '/images/purse.jpg'
    },
    {
      id: 5,
      title: ' Leather belt Restoration',
      category: 'Leather',
      image: '/images/belt.jpg'
    },
    {
      id: 6,
      title: 'Leather bag Repair',
      category: 'Leather',
      image: '/images/baf_after.jpg'
    }
  ]

  const categories = ['All', 'Bags', 'Shoes', 'Leather']

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
            Our Work Gallery
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the incredible transformations we achieve
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-white dark:bg-dark-bg">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-6 py-3 rounded-full border-2 border-fawn text-fawn hover:bg-fawn hover:text-white transition-all duration-300 font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <div
                    className="w-full h-80 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm text-fawn font-medium mb-2">
                      {item.category}
                    </div>
                    <h3 className="font-copperplate text-xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Click to view details
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {/* <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Work
            </motion.button>
          </motion.div> */}
        </div>
      </section>
    </div>
  )
}

export default GalleryPage
