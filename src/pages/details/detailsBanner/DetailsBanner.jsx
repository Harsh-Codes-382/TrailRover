import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';   // so we can access the mediaType and id from url because for detail page we need movies id and mediaType
import dayjs from 'dayjs';
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';
import Img from '../../../components/lazyloadimg/img';
import PosterFallBack from '../../../assets/no-poster.png';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import { PlayIcon } from '../Playbtn';  // it is just svg file
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import "./style.scss";
const DetailsBanner = ({ crew, videos }) => {

    const [show, setShow] = useState(false);       // this state will handle the toggle of videoPopup
    const [videoId, setVideoId] = useState(null);   // This state will handle the videoId which determine which video will play
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`); //we are fetching the data of particular movie/tv jiska humne id and mediaType bheja tha url mai

    const ToMinAndHour = (time) => {
        const hour = Math.floor(time / 60);
        const min = time % 60;
        return `${hour}h ${min > 0 ? `${min}m` : ""}`;
    }
    const _genres = data?.genres?.map((g) => g.id);   // we are storing the id we are getting from results into variable & we will pass this variable into Genre Componenet so it will get the genre name from there
    console.log(videos)

    const director = crew?.filter((f) => f.job === "Director" || f.job === "Series Director");  // we are making array for Director only
    const Writer = crew?.filter((f) => f.job === "Writer" || f.job === "Story" || f.job === "Screenplay" || f.job === "Creator");   // we are making array of these jobs roles
    console.log(videos ? videos : "not");
    const url = useSelector((state) => state.home.url);
    return (
        <div className='detailsBanner'>
            {!loading ? (
                <>
                    {!!data && (  // means agr data undefined nhi hai tbhi humme yeh html dikhaye because data ko aane mai time lgta hai or phir yeh error deta hai
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data?.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data?.poster_path ? (   // means agr poster_path present hai api result mai toh yeh src ho otherwise src ho PostrFallBack
                                            <Img className="posterImg"
                                                src={url.backdrop + data?.poster_path} />
                                        ) : (
                                            <Img className="posterImg"
                                                src={PosterFallBack} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data?.original_title || data?.name} (${dayjs(data?.release_date || data?.first_air_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data?.tagline || `Last Episode to AIR:  ${data?.last_episode_to_air?.name}`}
                                        </div>
                                        <Genres data={_genres} />
                                        <div className="row">
                                            <CircleRating Rating={data?.vote_average.toFixed(1)} />
                                            <div className='playbtn'
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(videos?.key); // we need the Id of video from videos array & Id is same as key so video.key will be the Id of video
                                                }}>
                                                <PlayIcon />
                                                <span className="text">
                                                    Watch Teaser
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overview">
                                            <div className="heading">OverView</div>
                                            <div className="description">
                                                {data?.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data?.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data?.status}
                                                    </span>
                                                </div>
                                            )}
                                            {(data?.release_date ? data.release_date : data?.first_air_date) && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data?.release_date || data.first_air_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {(data?.runtime || data?.episode_run_time[0]) && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        RunTime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {ToMinAndHour(data?.runtime || data?.episode_run_time[0])}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.homepage && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        <a target='_blank' href={data?.homepage}>Movie Page</a>
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {(director?.length > 0) && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director: {" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}        {/* Writing th director name */}
                                                            {director.length - 1 !== i && ", "}
                                                        </span>

                                                    ))
                                                    }
                                                </span>
                                            </div>
                                        )}
                                        {(Writer?.length > 0) && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer: {" "}
                                                </span>
                                                <span className="text">
                                                    {Writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}        {/* Writing th director name */}
                                                            {Writer.length - 1 !== i && ", "}
                                                        </span>

                                                    ))
                                                    }
                                                </span>
                                            </div>
                                        )}
                                        {(data.created_by?.length > 0) && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator: {" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}        {/* Writing th director name */}
                                                            {data?.created_by?.length - 1 !== i && ", "}
                                                        </span>

                                                    ))
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show} // we are sending the toggle flag as a prop
                                    setShow={setShow}   // To set the toggle flag we are also sending the state so,  we will be able to on/off the video player
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            )
                : (
                    <div className="detailsBannerSkeleton">
                        <ContentWrapper>
                            <div className="left skeleton"></div>
                            <div className="right">
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                                <div className="row skeleton"></div>
                            </div>
                        </ContentWrapper>
                    </div>

                )}

        </div>
    );
};

export default DetailsBanner
