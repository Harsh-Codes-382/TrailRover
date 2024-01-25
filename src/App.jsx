import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getapiConfiguration, getGenres } from './store/homeslice';
import { useState, useEffect } from 'react'
import { fetchDataFromApi } from './utils/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home';
import SearchResult from './pages/searchresult/SearchResult';
import Explore from './pages/explore/Explore';
import Details from './pages/details/Details';
import NotFound from './pages/404/NotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';


function App() {
  
  const dispatch = useDispatch();      // We are creating an instance of useDispatch() so, now we can use dispatch variable to call the action

  useEffect(() => {   // Always use useEffect() to fetch api & we calling that function here
    fetchapiconfig();
    genres();   // we will fetch the data for genres as soon as the website starts and we will store results into our store
  }, []);


  // This function is just using the other function which is fetching the api and returning the data 
  const fetchapiconfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res); 
      // we are making the object name of url to store only valuable information not whole data and we will send this data in dispatch 
      const url = {
        backdrop: res.images.secure_base_url + 'original',    // because acc. to docs of api this url joins with the image url then image will be shown
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original'

      }
      dispatch(getapiConfiguration(url)); // we are dispatching the action & url is passing to state because res is holding the data which is fetching from api 
    })
  };

  const genres = async () => {
    let Promises = [];
    let endpoints = ['tv', 'movie'];
    let allGenres = {};

    endpoints.forEach((i) => {
      Promises.push(fetchDataFromApi(`/genre/${i}/list`));   // it will make a api call for both which give us the result of genres & we are pushing both functions which return Promise into an array 
    })
    const DataOfPromises = await Promise.all(Promises); // Because we stored 2 functions which return Promise into array so we getting the data from promise.all

    DataOfPromises.map(({ genres }) => {   // DataOfPromises is array of 2 api results with genre name so we are destructuring
      return (
        genres.map((item) => {   // now we are accessing the item of each genre
          // WE ARE DOING ALL THIS PUSHING INTO OBJECT WITH A KEY AS IT'S ID BECAUSE GENRE IN OTHER API CALLS IDENTIFIES AS A ID
          (allGenres[item.id] = item)   // we are pushing into object allGeners id of item as a key and value will be whole item
        })
      )
    })
    dispatch(getGenres(allGenres))    // Now we are storing our genre object into store state "genres"
    // console.log(allGenres)
  }


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* :query,  :mediaype  = means we can set the dynamic value at place of them */}
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/:mediaType/:id' element={<Details />} />  {/* we are sending the mediaTypes and id dynamically so we can access them in useParams() */}
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<NotFound />} />   {/*   * means if none of the path above then this will open */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
