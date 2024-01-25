import { createSlice } from '@reduxjs/toolkit'

// Slices are part of redux-toolkit which help to update the state for like one page if we have home section which has various components and common states and actions so we create a slice for that whole page. A slice which have access of all states of home and can manipulate those states  

// homeSlice is a reducer
export const homeSlice = createSlice({   // we are creating the slice for home part and we need state and it has state like url, genres
  name: 'home',
  initialState: {
    url: {},
    genres: {}
  },
  reducers: {
    // This is a action which specifies the type of change want to make in state
    getapiConfiguration: (state, action) => { // state are initialState means it is also object and action which we pass
      state.url = action.payload  // Means we are updating the state url which is same as payload of action because payload will be different on choice
    },
    getGenres: (state, action) => {
      state.genres = action.payload

    }
  },
})

// Action creators are generated for each case reducer function
export const { getGenres, getapiConfiguration } = homeSlice.actions

export default homeSlice.reducer