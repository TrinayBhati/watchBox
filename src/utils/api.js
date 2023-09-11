import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2MzNTQzNjJhOGJlYTE5N2JiYTYyOTI5MzA5NWQ2YiIsInN1YiI6IjY0OTBhODNiOTc2YTIzMDExZTFiZDdlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wB7IVwR5XsJ7YwEq7oao7PlP_Epg-CMvGJay-hMeeDk";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get
            (BASE_URL + url, {
                headers,
                params
            })
        // const data = data1.data;
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}



// DESTRUCTURE OF DATA (BELOW CODE WITHOUT DESTRUCRING)

// axios.get(BASE_URL + url, { headers, params })
//     .then(function (response) {
//         const data = response.data;
//         // your code here
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// destrucued data coz n =in response we have alotof things and in that thwere is jey named data in whihch we have an array of 20 obj
// so we destructred that data likewe do if we have one object with difefernt keys so we write key name  =  object
// and destrucred it

//data here and in useFecth are differnt as name is same but differnet varibales hrer data is havng response
// get from api and there data is a state in whihc we updating(storing) the response
