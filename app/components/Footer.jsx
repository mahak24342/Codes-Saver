import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-8">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <p className="text-sm md:text-base">
      &copy; {new Date().getFullYear()} Your Codes Saver App. All rights reserved.
    </p>
    <p className="text-sm md:text-base mt-2">
      Built with ❤️ by <span className="font-semibold text-white">Mahak Porwal</span>
    </p>
    <div className="mt-4">
      <a href="#" className="text-gray-400 hover:text-white mx-2 transition duration-300">Privacy Policy</a>
      <a href="#" className="text-gray-400 hover:text-white mx-2 transition duration-300">Terms of Service</a>
      <a href="#" className="text-gray-400 hover:text-white mx-2 transition duration-300">Contact</a>
    </div>
  </div>
</footer>

  )
}

export default Footer