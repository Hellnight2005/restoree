// components/Header.jsx

"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

type UserProfile = {
  userId: string;
  name: string;
  profileImage: string;
};

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true);

    // Function to check and set the user profile from the cookie
    const checkUserProfile = () => {
      const profileCookie = Cookies.get('profile');
      if (profileCookie) {
        try {
          setUserProfile(JSON.parse(profileCookie));
        } catch (e) {
          console.error("Failed to parse profile cookie", e);
          setUserProfile(null); // Clear state if cookie is invalid
        }
      } else {
        setUserProfile(null); // Clear state if cookie is removed
      }
    };

    // Initial check when the component mounts
    checkUserProfile();

    // Set up a periodic check to handle the redirect scenario
    const interval = setInterval(checkUserProfile, 1000); // Check every second

    // Cleanup function to clear the interval
    return () => clearInterval(interval);

  }, []); // Empty dependency array ensures this runs once

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' }
  ]

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleGoogleLogin = () => {
    window.location.href = '/api/user/auth/google_login';
  }

  const handleLogout = () => {
    Cookies.remove('profile');
    setUserProfile(null);
    router.push('/');
  }

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-fawn rounded-full flex items-center justify-center">
              <span className="text-white font-copperplate font-bold text-lg">R</span>
            </div>
            <span className="font-copperplate text-xl font-bold text-fawn">
              Réstorée
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-fawn dark:hover:text-fawn transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
            {/* Conditional rendering for login button or profile picture */}
            {userProfile ? (
              <div className="relative group">
                <img
                  src={userProfile.profileImage}
                  alt={userProfile.name}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-700">
                    {userProfile.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="px-4 py-2 text-white bg-fawn rounded-lg hover:bg-fawn-dark transition-colors duration-200 font-medium"
              >
                Login
              </button>
            )}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-fawn dark:hover:text-fawn hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
                {userProfile ? (
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={userProfile.profileImage}
                        alt={userProfile.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {userProfile.name}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        Cookies.remove('profile');
                        setUserProfile(null);
                        setIsMenuOpen(false);
                        router.push('/');
                      }}
                      className="mt-2 block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleGoogleLogin}
                    className="mt-2 block w-full text-center px-4 py-2 text-white bg-fawn rounded-lg hover:bg-fawn-dark transition-colors duration-200 font-medium"
                  >
                    Login
                  </button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;