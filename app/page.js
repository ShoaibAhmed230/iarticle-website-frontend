'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import TypedText from './blog/Components/TypedText'



const Blog = () => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('http://localhost:1337/api/articles?populate=*', {
          cache: 'no-store',
        })
        const data = await res.json()
        setArticles(data.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
 <section className="h-80 p-10 sm:h-96 relative flex flex-col justify-center items-center text-white bg-[url('http://localhost:1337/uploads/pexels_thepaintedsquare_593322_039d361278.jpg')] bg-no-repeat bg-cover">
  {/* Gradient Black Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>

  {/* Content */}
  <div className="relative z-10 text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg mb-4 animate-fade-in">
      Welcome to Our Articles
    </h1>

    <TypedText />

    <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-xl mx-auto animate-fade-in-up">
      Stay updated with trending articles, tips, and resources curated for modern creators.
    </p>
  </div>
</section>


      {/* Related Articles Slider */}
      <div className="max-w-7xl mx-auto px-4 py-10 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            loop
            autoplay={{ delay: 3000 }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="overflow-visible"
          >
            {articles.map((article) => (
              <SwiperSlide key={article.id}>
                <div className="bg-white rounded-xl shadow-2xl hover:shadow-lg transition duration-300 mb-20">
                  <Link href={`/blogpost/${article.slug}`} className="block">
                    {article.cover?.url && (
                      <img
                        src={`http://localhost:1337${article.cover.url}`}
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-t-xl"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Arrows */}
          <button
            className="sm:block hidden cursor-pointer custom-prev absolute left-2 sm:-left-10 top-1/2 transform -translate-y-1/2 text-gray-900 p-2 sm:p-3 rounded-full shadow-lg z-50 hover:bg-gray-600 hover:text-white text-4xl"
          >
            ‹
          </button>
          <button
            className="sm:block hidden cursor-pointer custom-next absolute right-2 sm:-right-10 top-1/2 transform -translate-y-1/2 text-gray-900 p-2 sm:p-3 rounded-full shadow-lg z-50 hover:bg-gray-600 hover:text-white text-4xl"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
