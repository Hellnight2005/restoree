"use client"

import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Bag Restoration', href: '/services#bags' },
      { name: 'Shoe Polishing', href: '/services#shoes' },
      { name: 'Leather Repair', href: '/services#leather' },
      { name: 'Hardware Replacement', href: '/services#hardware' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Process', href: '/about#process' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  }

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-fawn rounded-full flex items-center justify-center">
                <span className="text-white font-copperplate font-bold text-lg">R</span>
              </div>
              <span className="font-copperplate text-xl font-bold text-fawn">
                Réstorée
              </span>
            </Link>
            <p className="text-gray-300 mb-4">
              Luxury restoration services for bags, shoes, and accessories. 
              Revive your vibe with expert craftsmanship.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-fawn rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  { /* Use createElement to render dynamic icon safely */ }
                  {/**/}
                  {(() => {
                    const Icon = social.icon
                    return <Icon className="w-5 h-5" />
                  })()}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-copperplate text-lg font-semibold mb-4 text-fawn">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-fawn transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-copperplate text-lg font-semibold mb-4 text-fawn">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-fawn transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-copperplate text-lg font-semibold mb-4 text-fawn">
              Contact
            </h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-fawn" />
                <span>Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-fawn" />
                <span>+971 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-fawn" />
                <span>hello@restoree.ae</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="font-medium mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-fawn text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-fawn hover:bg-fawn/90 text-white rounded-r-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Réstorée. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
