import React from 'react'
import Link from 'next/link'


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
          <Link href="/" className="hover:text-white transition">Home</Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-gray-700 transition">Article</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-gray-700 transition">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-gray-700 transition">Contact</Link>
        </li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Resources</h4>
      <ul className="space-y-2">
        <li>
          <Link href="#" className="hover:text-gray-700 transition">Privacy Policy</Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-700 transition">Terms of Service</Link>
        </li>
        <li>
          <Link href="#" className="hover:text-gray-700 transition">Support</Link>
        </li>
      </ul>
    </div>

    {/* Social Media */}
    <div>
      <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
      <div className="flex space-x-4">
        <Link href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-facebook-f"></i>
        </Link>
        <Link href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-twitter"></i>
        </Link>
        <Link href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-instagram"></i>
        </Link>
        <Link href="#" className="hover:text-gray-700 transition">
          <i className="fab fa-linkedin-in"></i>
        </Link>
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
