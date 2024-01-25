import React, { useState, useEffect } from 'react';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import '../../home/style.scss'

const Trending = () => {
  const [endpoint, SetEndPoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const OnTabChange = (tab) => {
    SetEndPoint(tab === "Day" ? "day" : "week");  // we are checking if user selected the 'Day' then 'day' will be set as endpoint otherwise 'week' & endpoint will be sent to api as url
  }



  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} OnTabChange={OnTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />

    </div>
  )
}

export default Trending
