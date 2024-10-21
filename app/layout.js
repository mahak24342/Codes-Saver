'use client'
import { Inter } from 'next/font/google'
import './globals.css'
//import store from '@/app/store'
//import { Provider } from 'react-redux'
//import {providers} from "@/app/providers"
import {providers} from '@/app/Providers';
//import {Providers} from '@/app/providers'
import { Provider } from 'react-redux'
import {store} from '@/app/store'
import Nav from './components/Nav';
import Footer from './components/Footer';
//import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
 
      <body className={inter.className}> <Provider store={store}>
      <Nav/>
       {children} 
       <Footer/>   </Provider></body>
     
      </html>
     
  )
}
