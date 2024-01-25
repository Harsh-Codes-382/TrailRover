import axios from "axios";

const BASE_URL =  "https://api.themoviedb.org/3";   // It is a URL which will be common every time we call api
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN; 
// const API_KEY = "db307275031d346f353482458d5bcf35";

const headers = {
    Authorization:"bearer " + TMDB_TOKEN,       // This is header we write this as it was in api document
};

 // This function fetching the api
export const fetchDataFromApi = async (url, params) =>{
    // url = means like popular movies or latest movies they are variations in url based on our choice 
    // params = specify the type of url we are sending like integer, string  
    try{
        const {data} = await axios.get(BASE_URL + url,{
            headers,
            params
        })
        return data;

    }catch(err){
        console.log(`Error is ${err}`);
        return err;
    }

}