import React, { useState, useRef } from 'react'
import VideoPopup from '../../../components/videoPopup/VideoPopup'
import Img from '../../../components/lazyloadimg/img'
import ContentWrapper from '../../../components/contentWrapper/contentWrapper'
import { PlayIcon } from '../Playbtn'       // it is a svg file 
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import "./style.scss";

const VideoSection = ({ AllVideos, loading }) => {
    const videoContainer = useRef();

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    const navigation = (direction) => {
        const container = videoContainer.current;    // this will select the div in which we provided a ref
        const scrollAmount = direction === 'left' ? container.scrollLeft - (container.offsetWidth + 20)   // here we subtracting the scrollLeft of container with the total width of container so it can move. (+20) because of gap between the conatiner cards

            : container.scrollLeft + (container.offsetWidth + 20)

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    return (
        <div className='videosSection'>
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className='carouselLeftNav arrow'
                    onClick={() => navigation("left")}  // on click of left arrow we sending the 'left' to function
                />
                <BsFillArrowRightCircleFill
                    className='carouselRightNav arrow'
                    onClick={() => navigation("right")}
                />

                <div className="sectionHeading">Official Videos</div>
                {!loading ? (<div className='videos' ref={videoContainer}>
                    {AllVideos?.results?.map((item) => (
                        <div key={item.id}  // we are setting the video id as it's key
                            className="videoItem"
                            onClick={() => {
                                setShow(true);
                                setVideoId(item.key)       // To access the video we need the key from it's object & here we are setting the key to state & then we are passing that state to VideoPopup Component so it can fullfill the url
                            }}>
                            <div className="videoThumbnail">
                                <Img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`} />
                                <PlayIcon />
                                <div className="videoTitle">
                                    {item.name}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />

        </div>
    )
}

export default VideoSection
