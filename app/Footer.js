import React from 'react'

const footer = () => {
  return (
    <div>
      <footer className="bg-gray-200 text-gray-900 mt-10">
  <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {/* Logo & About */}
    <div>
      <h3 className="text-xl font-bold mb-3">iArticle</h3>
      <p className="text-gray-400 text-sm">
        A modern blog platform to share stories, insights, and ideas for creators and thinkers.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
      <ul className="space-y-2">
        <li>
          <a href="/" className="hover:text-white transition">Home</a>
        </li>
        <li>
          <a href="/blog" className="hover:text-gray-700 transition">Article</a>
        </li>
        <li>
          <a href="/about" className="hover:text-gray-700 transition">About</a>
        </li>
        <li>
          <a href="/contact" className="hover:text-gray-700 transition">Contact</a>
        </li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Resources</h4>
      <ul className="space-y-2">
        <li>
          <a href="#" className="hover:text-gray-700 transition">Privacy Policy</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-700 transition">Terms of Service</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-700 transition">Support</a>
        </li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} iArticle. All rights reserved.
  </div>
</footer>

    </div>
  )
}

export default footer
