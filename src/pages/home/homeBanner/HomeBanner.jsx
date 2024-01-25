import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import banner from './banner.jpg'
import Img from '../../../components/lazyloadimg/img';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import "./style.scss";

const HomeBanner = () => {
  const [background, setbackground] = useState("");
  const [query, setquery] = useState("");
  const navigate = useNavigate();   // navigate we are using a instance of useNavigate() so we can send the query from search bar to url
  const { data, loading } = useFetch("/movie/popular");    // using destructuring we extracting tha data it is returning

  const urlOfImg = useSelector((state) => state.home.url)

  useEffect(() => {
    // Because the urlOfImg is object we stored in store in url state & .backdrop holds the half of image url
    const bg = urlOfImg?.backdrop + data?.results?.[Math.floor(Math.random() * data.results.length)]?.backdrop_path
    setbackground(bg ? bg : banner);
  }, [data])   // data because we want useEffect() to call again & again when the data(means api results) changes and everytime we reload the page data changes so, img changes

  const searchqueryhandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)    // /search because in routing we set the /search/:quer
    }
  }
  return (
    <>
      <div className="herobanner">

        {!loading && (<div className="backdrop-img"> <Img src={background ? background : banner} /> </div>)}
        <div className="opacity-layer"></div>   {/* opacity div is for to merge our back photo from below */}
        <ContentWrapper>
          <div className="herobannercontent">
            <span className="title">Welcome</span>
            <span className="subtitle">
              Enjoy Latest TV shows, Movies, Series of your desire.
              Explore now this world
            </span>
            <div className="searchInput">
              <input type="text"
                onKeyUp={searchqueryhandler}
                onChange={(e) => setquery(e.target.value)}
                placeholder='Search your movies, tv shows' />
              <button className='searchbtn'>Search</button>

            </div>
          </div>
        </ContentWrapper>
      </div>

    </>
  )
}

export default HomeBanner
