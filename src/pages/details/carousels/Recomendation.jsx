import React from 'react'
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
const Recomendation = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);
    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
        />
    )
}

export default Recomendation
