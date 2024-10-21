
import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '@/app/redux/pasteSlice'
export const store=configureStore({
  reducer: {
    paste:pasteReducer,
    
  }
})