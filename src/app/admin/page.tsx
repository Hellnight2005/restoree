"use client"

import { motion } from 'framer-motion'

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,247', change: '+12%', changeType: 'positive' },
    { title: 'Total Bookings', value: '856', change: '+8%', changeType: 'positive' },
    { title: 'Upcoming Meetings', value: '23', change: '-5%', changeType: 'negative' },
    { title: 'Most Popular Service', value: 'Bag Restoration', change: '+15%', changeType: 'positive' }
  ]

  const recentBookings = [
    { id: 1, name: 'Sarah Johnson', service: 'Bag Restoration', date: '2024-01-15', status: 'Confirmed' },
    { id: 2, name: 'Michael Chen', service: 'Shoe Polishing', date: '2024-01-14', status: 'Completed' },
    { id: 3, name: 'Emma Davis', service: 'Leather Repair', date: '2024-01-13', status: 'In Progress' }
  ]

  return (
    <div className="min-h-screen bg-anti-flash dark:bg-dark-bg">
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Manage your restoration business efficiently
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {stat.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Bookings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{booking.name}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{booking.service}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{booking.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-fawn hover:text-fawn/80 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="card p-6 text-center">
            <h3 className="font-copperplate text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Add New Service
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create a new restoration service
            </p>
            <button className="btn-primary">Add Service</button>
          </div>

          <div className="card p-6 text-center">
            <h3 className="font-copperplate text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Upload Gallery
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Add new before/after images
            </p>
            <button className="btn-primary">Upload Images</button>
          </div>

          <div className="card p-6 text-center">
            <h3 className="font-copperplate text-xl font-semibold text-gray-900 dark:text-white mb-4">
              View Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Check business performance
            </p>
            <button className="btn-primary">View Analytics</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
