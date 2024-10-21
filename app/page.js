import React from 'react'
import Nav from './components/Nav'
import Main from './components/main'
import New from './components/New'
import Fine from './components/Fine'
import { Toaster } from 'react-hot-toast'


const page = () => {
  return (
    <div className='bg-gray-800'>
     <Toaster/>
     <Fine/>
    </div>
  )
}

export default page