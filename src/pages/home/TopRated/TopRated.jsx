import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import '../../home/style.scss'

const Top_Rated = () => {
  const [endpoint, SetEndPoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);     // this url will call for top rated movies or tv shows based on endpoint

  const OnTabChange = (tab) => {
    SetEndPoint(tab === "Movies" ? "movie" : "tv");  // we are checking if user selected the 'Day' then 'day' will be set as endpoint otherwise 'week' & endpoint will be sent to api as url
  }



  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} OnTabChange={OnTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />

    </div>
  )
}

export default Top_Rated
