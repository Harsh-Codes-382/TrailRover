import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import Trending from "../pages/home/trending/Trending";


const useFetch = (url) => {

    const [data, setData] = useState(null);     // it will store the result from api
    const [Loading, setLoading] = useState(null);       // it will set and unset the loading
    const [Error, setError] = useState(null);       // it is for error
    useEffect(() => {
        setLoading(true);       // because useEffect() will be call again itself when url changes so everytime we set it to loading
        setError(null);     // because useEffect() will be call again itself when url changes so everytime we set it to null
        setData(null);      // because useEffect() will be call again itself when url changes so everytime we set it to null

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            }).catch((err) => {
                setLoading(false);
                setError(err);
            })
    }, [url]);       // we se the url here so everytime we change this useEffect() will call again 
    return { data, Loading, Error };
};

export default useFetch;
