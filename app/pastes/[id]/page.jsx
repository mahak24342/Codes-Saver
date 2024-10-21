'use client'
import { useParams } from 'next/navigation'
import React, { useState,useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

const Page = () => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [loading ,setLoading]=useState(true)
  const { id } = useParams()
  const allPastes = useSelector((state) => state.paste.pastes)

  const paste = allPastes.find((p) => p._id === id)
  useEffect(() => {
    const fetchData = () => {
      // Simulate loading time
      setTimeout(() => {
        setLoading(false) // Set loading to false after data is fetched
      }, 1000) // Adjust time as needed
    }
    
    fetchData()
  }, [])
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <Toaster />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:text-3xl lg:text-4xl">
        Content
      </h2>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-4 md:space-y-6 lg:space-y-8">
        <input
          type="text"
          placeholder="Enter title"
          value={paste?.title || ''}
          disabled
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-gray-50"
        />
        <textarea
          rows={8}
          placeholder="Enter content"
          value={paste?.content || ''}
          disabled
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 bg-gray-50"
        />
        <div className="flex justify-end">
          <button
            onClick={() => {
              navigator.clipboard.writeText(paste?.content)
              toast.success('Copied')
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
