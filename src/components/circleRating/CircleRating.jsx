import React from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";      // It is a react library to show progressbar
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ Rating }) => {
  return (
    <div className='circleRating'>
      <CircularProgressbar
        value={Rating}
        text={Rating}
        maxValue={10}
        styles={buildStyles({
          pathColor: Rating < 5 ? 'red' : Rating < 7 ? 'orange' : 'green'
        })} />

    </div>
  )
}

export default CircleRating
