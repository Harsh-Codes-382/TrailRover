import React from 'react';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';


const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"
    return (
        <Carousel
            title={title}
            endpoint={mediaType}
            data={data?.results}
            loading={loading}
        />
    )
}

export default Similar
