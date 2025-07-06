'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

// const API_BASE_URL = process.env.BACK_API
const API_BASE_URL = process.env.NEXT_PUBLIC_BACK_API


const Blog = () => {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([]) // Unique categories
  const [selectedCategory, setSelectedCategory] = useState('all') // Default: Show all

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(API_BASE_URL+"/api/articles?populate[category][populate]=*&populate[author][populate]=*&populate=cover  ", {
          cache: 'no-store'
        })
        const data = await res.json()
        setArticles(data.data)

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.data.map((article) => article.category?.name).filter(Boolean))
        ]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }
    fetchArticles()
  }, [])

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || article.category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Latest Articles
      </h1>

      {/* Search Box */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="placeholder-black text-black w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-3 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === 'all'
              ? 'bg-gray-600 cursor-pointer text-white'
              : 'bg-white text-gray-700 cursor-pointer hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? 'bg-gray-600 cursor-pointer text-white'
                : 'bg-white text-gray-700 cursor-pointer hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div
              key={article.id}
              className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition duration-300"
            >
              <Link href={`/blogpost/${article.slug}`} className="hover:underline">
                {/* Cover Image */}
                {article.cover?.url && (
                  <img
                    src={article.cover.url}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-2">
                  {article.description?.slice(0, 100)}...
                </p>

                {/* Category */}
                {article.category && (
                  <p className="text-xs text-gray-500 italic">
                    Category: {article.category.name}
                  </p>
                )}

                {/* Author */}
                {article.author && (
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Author:</strong> {article.author.name}
                  </p>
                )}

                {/* Meta */}
                <div className="text-xs text-gray-400 mt-1">
                  <span>Created At: {new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No articles found.</p>
        )}
      </div>
    </div>
  )
}

export default Blog
