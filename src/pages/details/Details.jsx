import React from 'react'
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideoSection from './videoSection/VideoSection';
import Similar from './carousels/Similar';
import Recomendation from './carousels/Recomendation'
import { useParams } from 'react-router-dom';   // so we can access the mediaType and id from url because for detail page we need movies id and mediaType 
import "./style.scss";
const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`); //to fetch the videos of movie/tvShow which we clicked & to show this video on detailPage
  //To fetch the cast name & directors name
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);    // data:credits means ek new variable bnaya taaki yeh error na de same name ka pr data, loading use krna important hai because these are variable useFetch() retruning & we are destructuring
  return (
    <div>
      <DetailsBanner videos={data?.results?.[0]}  // we are passing only 1st Object means 1 video for trailer
        crew={credits?.crew} />   {/* Sending the crew as a props */}

      <Cast credits={credits?.cast}  // we are sending only cast array from here
        loading={creditsLoading} />

      <VideoSection AllVideos={data}
        loading={loading} />

      <Recomendation mediaType={mediaType}  //For recomendation we need the movie/tv mediaType and it's id to fetch the api endpoint in there component
        id={id} />

      <Similar mediaType={mediaType}
        id={id} />
    </div>
  )
}

export default Details
