import React, { useRef } from 'react'    // useRef is a way to select particular div and we can execute some conditions acc. to it
import dayjs from 'dayjs'; // to format the date we are getting from api results
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Genres from '../genres/Genres';
import CircleRating from '../circleRating/CircleRating';
import ContentWrapper from '../contentWrapper/contentWrapper';
import PosterFallBack from '../../assets/no-poster.png';
import Img from '../lazyloadimg/img';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import './style.scss';

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const url = useSelector((state) => state.home.url);
  const navigate = useNavigate();

  const Skeleton = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }

  const navigation = (direction) => {
    const container = carouselContainer.current;    // this will select the div in which we provided a ref
    const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth + 20)   // here we subtracting the scrollLeft of container with the total width of container so it can move. (+20) because of gap between the conatiner cards

      : container.scrollLeft + (container.offsetWidth + 20)

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <div className='carousel'>
      <ContentWrapper>
        {title && <div className='carouselTitle'>{title} </div>}
        <BsFillArrowLeftCircleFill
          className='carouselLeftNav arrow'
          onClick={() => navigation("left")}  // on click of left arrow we sending the 'left' to function
        />
        <BsFillArrowRightCircleFill
          className='carouselRightNav arrow'
          onClick={() => navigation("right")}
        />

        {/* Means untill the loading is false & this fact is true then display our carousel but if this fact is false means (loading:true) then display skeleton html, css  */}

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posturl = item.poster_path ?   // item.poster_path holds the half image url if it exists then
                url.poster + item.poster_path  // we will add the url.poster which we had in our store state (url) with the poster_path 
                : PosterFallBack;    // but if the item.poster is undefined then show PosterFallback image at place of image
              return (
                <div key={item.id}

                  className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                  <div className="posterBlock">
                    <Img src={posturl} />
                    <CircleRating Rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />   {/* We are sending the genre id so we can select the right genre from store based on id match */}
                  </div>
                  <div className="textBlock">
                    <span className='title'>
                      {item.title || item.name}   {/* Because in case of movie title is present but in case of tv shows name is present */}
                    </span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format('MMM D, YYYY')}
                    </span>
                  </div>

                </div>

              )
            })}


          </div>

        ) : (
          <span className='loadingSkeleton'>
            {Skeleton()}
            {Skeleton()}
            {Skeleton()}
            {Skeleton()}
            {Skeleton()}
          </span>

        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel
