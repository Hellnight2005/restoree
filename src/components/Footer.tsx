"use client"

import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react'
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
      { name: 'Return Policy', href: '/returns' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  }

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    // { name: 'Facebook', icon: Facebook, href: '#' },
    // { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'WhatsApp', icon: MessageCircle, href: '#' }, // Using MessageCircle as an alternative
    { name: 'YouTube', icon: Youtube, href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        {/* Top Section: Brand, Navigation, and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-800">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-fawn rounded-full flex items-center justify-center">
                <span className="text-white font-copperplate font-bold text-lg">R</span>
              </div>
              <span className="font-copperplate text-xl font-bold text-fawn">
                Réstorée
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Luxury restoration services for bags, shoes, and accessories.
              Revive your vibe with expert craftsmanship.
            </p>
          </div>

          {/* Navigation Links - Services, Company, Support */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:col-span-1 lg:col-span-2 gap-8 sm:gap-4 md:gap-8">
            {/* Services Links */}
            <div>
              <h3 className="font-copperplate text-base font-semibold mb-4 text-fawn">
                Services
              </h3>
              <ul className="space-y-2 text-sm">
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
              <h3 className="font-copperplate text-base font-semibold mb-4 text-fawn">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
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
            {/* Support Links */}
            <div>
              <h3 className="font-copperplate text-base font-semibold mb-4 text-fawn">
                Support
              </h3>
              <ul className="space-y-2 text-sm">
                {footerLinks.support.map((link) => (
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
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="font-copperplate text-base font-semibold mb-4 text-fawn">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm">
              {/* Updated location with link to Google Maps */}
              <a
                href="https://www.google.com/maps/place/Andheri,+Mumbai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-fawn transition-colors duration-200"
              >
                <MapPin className="w-4 h-4 text-fawn" />
                <span>Andheri, Mumbai</span>
              </a>
              {/* Phone Link */}
              {/* <a
                href="tel:+971501234567"
                className="flex items-center space-x-3 text-gray-300 hover:text-fawn transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-fawn" />
                <span>+971 50 123 4567</span>
              </a> */}
              {/* Email Link */}
              <a
                href="mailto:hello@restoree.ae"
                className="flex items-center space-x-3 text-gray-300 hover:text-fawn transition-colors duration-200"
              >
                <Mail className="w-4 h-4 text-fawn" />
                <span>hello@restoree.ae</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Social & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-gray-400 text-sm">
          {/* Social Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.5, color: '#D4AF37' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-500 hover:text-fawn transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </div>
          {/* Copyright */}
          <p>© {currentYear} Réstorée. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;