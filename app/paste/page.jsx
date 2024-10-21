"use client"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast, { Toaster } from 'react-hot-toast'
import { format } from 'date-fns';  
const Page = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true) // Loading state
  const dispatch = useDispatch()
  
  // Simulate data fetching
  useEffect(() => {
    const fetchData = () => {
      // Simulate loading time
      setTimeout(() => {
        setLoading(false) // Set loading to false after data is fetched
      }, 1000) // Adjust time as needed
    }
    
    fetchData()
  }, [])

  const filterr = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster />
      <input
        type="text"
        placeholder="Search Here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl mx-auto block mb-6 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterr.length > 0 && filterr.map((paste) => {
          return (
            <div key={paste._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {paste.title}
                </h3>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 line-clamp-3">
                  {paste.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                </button>
                <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                  <a href={`/pastes/${paste?._id}`}> View </a>
                </button>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
                <button onClick={() => {
                  navigator.clipboard.writeText(paste?.content)
                  toast.success('Copied')
                }} className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded">
                  Copy
                </button>
              
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: paste.title,
                        text: paste.content,
                        url: window.location.href,
                      })
                      .then(() => {
                        toast.success('Shared successfully!');
                      })
                      .catch((error) => {
                        toast.error('Sharing failed: ' + error);
                      });
                    } else {
                      toast.error('Sharing not supported on this browser.');
                    }
                  }}  className="px-3 py-1 text-sm text-teal-600 hover:bg-teal-50 rounded">
                  Share
                </button>
              </div>

              <div className="text-sm text-gray-500">
              {format(new Date(paste.createdAt), 'MMMM d, yyyy')}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Page
