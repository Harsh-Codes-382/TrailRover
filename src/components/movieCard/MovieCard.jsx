import React from 'react'
import { useNavigate } from 'react-router-dom';
import Img from '../lazyloadimg/img';
import { useSelector } from 'react-redux';
import Genres from '../genres/Genres';
import dayjs from 'dayjs';
import PosterFallBack from '../../assets/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import "./style.scss";

const MovieCard = ({data, mediaType, fromSearch}) => {
    const navigate = useNavigate();
    const url = useSelector((state)=> state.home.url);
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallBack;

  return (
    <div className='movieCard'
    onClick={()=> navigate(`/${data?.media_type || mediaType}/${data.id}`)}>
        <div className="posterBlock">
            <Img className={'posterImg'} src={posterUrl}/>
            {!fromSearch && (
                <React.Fragment>
                    <CircleRating Rating={data?.vote_average.toFixed(1)}/>
                    <Genres data={data?.genre_ids.slice(0,2)}/>
                </React.Fragment>
            )}
        </div>
        <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
    </div>
  );
};

export default MovieCard
