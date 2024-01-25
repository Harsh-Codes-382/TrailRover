import React from 'react'
import "./style.scss";
import HomeBanner from './homeBanner/HomeBanner';
import Trending from './trending/Trending';
import Popular from './Popular/Popular';
import Top_Rated from './TopRated/TopRated';
const Home = () => {
  return (
    <div className="homepage">

      <HomeBanner />
      <Trending />
      <Popular />
      <Top_Rated />

    </div>
  )
}

export default Home
