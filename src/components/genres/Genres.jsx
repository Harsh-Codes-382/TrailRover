import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';

const Genres = ({ data }) => {        // data as a props destructured which carries the array of genre id
  const genres = useSelector((state) => state.home.genres);

  return (
    <div className='genres'>

      {data?.map((i) => {
        // Because genres object key is same as the genres id and we will match that key to genre id and of matched object element name will be displayed
        if (!genres[i]?.name)       // means if store state genres (object) doesn't have the id same as it's key so obviously it also will not have the genre name in object so just return.
          return;
        return (
          <div
            key={i}
            className="genre">
            {genres[i]?.name}

          </div>
        )
      })}


    </div>
  )
}

export default Genres
