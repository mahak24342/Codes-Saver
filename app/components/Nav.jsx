import Link from 'next/link'
import React from 'react'
import Main from './Main'

const Nav = () => {
  return (
    <nav className="bg-gray-800  p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-medium text-white hover:text-blue-800">
          Create
        </Link>
      
        <Link href="/paste" className="text-lg  font-medium text-white hover:text-blue-800">
          Your Notes
        </Link>
      </div>
  
   
    </nav>
  )
}

export default Nav
