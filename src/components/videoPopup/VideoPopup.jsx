import React from 'react'
import "./style.scss";
import ReactPlayer from 'react-player/youtube';

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {

  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  }
  console.log(videoId);

  return (
    <div>
      <div className={`videoPopup ${show ? "visible" : " "}`}>   {/* If show state is true then 'visible' class will be added */}
        <div className="opacityLayer" onClick={hidePopup}></div>
        <div className="videoPlayer">
          <span className="closeBtn" onClick={hidePopup}>Close</span>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            height="100%"
            playing={true}

          />
        </div>
      </div>

    </div>
  )
}

export default VideoPopup
