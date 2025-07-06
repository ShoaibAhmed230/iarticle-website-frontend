'use client'
import { useState } from 'react'


const API_BASE_URL = process.env.NEXT_PUBLIC_BACK_API


export default function CommentForm({ articleId, onCommentAdded }) {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    console.log('handleSubmit');
    

    try {
      await fetch(API_BASE_URL+'/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            author,
            content,
            article: articleId, // Link comment to the article
          },
        }),
      })

      setAuthor('')
      setContent('')

      if (onCommentAdded) {
        onCommentAdded() // ✅ Trigger parent refresh
      }
    } catch (err) {
      console.error('Comment submission failed:', err)
    }

    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Comment</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Post Comment'}
      </button>
    </form>
  )
}
