import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeslice'

export const store = configureStore({
  reducer: {
    home: homeSlice     // This is reducer so we can access this in our components through store
  },
})