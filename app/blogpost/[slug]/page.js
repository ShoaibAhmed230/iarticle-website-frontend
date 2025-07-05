'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CommentForm from '../../blog/Components/commentsForm'
import CommentList from '../../blog/Components/commentsList'
import Link from 'next/link'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0) // refresh comments

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`
        )
        const json = await res.json()
        console.log('Fetched Article JSON:', json)

        if (json?.data?.length > 0) {
          setArticle(json.data[0]) // Use the root level of data
        } else {
          console.warn('No article found for slug:', slug)
          setArticle(null)
        }
      } catch (err) {
        console.error('Error fetching article:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug, refreshKey])

  if (loading) {
    return (
      <div className="text-center text-gray-300 py-20 bg-gray-900 min-h-screen">
        Loading article...
      </div>
    )
  }

  if (!article) {
    return (
      <div className="bg-gray-900 text-gray-300 py-20 text-center min-h-screen">
        <h1 className="text-2xl font-semibold">Article not found</h1>
        <a href="/blog" className="text-blue-500 mt-4 inline-block hover:underline">
          ← Back to Blog
        </a>
      </div>
    )
  }

  // 🆕 Access fields directly (no .attributes)
  const title = article.title || 'Untitled'
  const description = article.description || 'No description available.'
  const publishedAt = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString()
    : 'Unknown date'
  const authorName = article.author?.name || 'Unknown Author'
  const coverUrl = article.cover?.url
    ? `http://localhost:1337${article.cover.url}`
    : null

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-50 mb-4 capitalize">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex items-center text-sm text-gray-400 mb-6 gap-3">
          <span>Published on: {publishedAt}</span>
          <span>•</span>
          <span>Author: {authorName}</span>
        </div>

        {/* Cover Image */}
        {coverUrl && (
          <div className="w-full rounded-lg overflow-hidden mb-6">
            <img
              src={coverUrl}
              alt={title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <p className="mb-8 text-gray-400 text-lg">{description}</p>

        {/* Comments */}
        <CommentForm
          articleId={article.id}
          onCommentAdded={() => setRefreshKey(Date.now())}
        />
        <CommentList articleId={article.id} />
        

        {/* Back Link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-block text-blue-500 hover:underline hover:text-blue-400 transition"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
