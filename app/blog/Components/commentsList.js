'use client'

import { useEffect, useState } from 'react'

// const API_BASE_URL = process.env.BACK_API
const API_BASE_URL = process.env.NEXT_PUBLIC_BACK_API


export default function CommentList({ articleId, refreshKey  }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
         `${API_BASE_URL}/api/comments?filters[article][id][$eq]=${articleId}&populate=*`
        )
        const json = await res.json()
        console.log('✅ Comments:', json)
        setComments(json?.data || [])
      } catch (err) {
        console.error('❌ Failed to fetch comments:', err)
      }
    }
    

    if (articleId) fetchComments()
  }, [articleId, refreshKey])

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      <ul className="space-y-4 mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => {
            const attrs = comment?.attributes || comment
            return (
              <li
                key={comment.id}
                className="p-4 bg-gray-100 rounded text-gray-900"
              >
                <p className="font-bold">{attrs.author || 'Anonymous'}</p>
                <p>{attrs.content || 'No content available.'}</p>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}