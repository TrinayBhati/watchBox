import axios from "axios";

const BASE_URL = "http://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2MzNTQzNjJhOGJlYTE5N2JiYTYyOTI5MzA5NWQ2YiIsInN1YiI6IjY0OTBhODNiOTc2YTIzMDExZTFiZDdlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wB7IVwR5XsJ7YwEq7oao7PlP_Epg-CMvGJay-hMeeDk";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, { headers, params });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
