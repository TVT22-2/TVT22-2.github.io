import customData from '../components/genreids.json';
 let UpcomingMovies = [
    {
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
 let TrendingMovies = [
    {
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
 let RecentMovies = [
    {
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
 let TopratedMovies = [
    {
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
export async function MovieDBRegData(saveval){
    let moviearray = {
        title: "",
        genreid: "",
        posterpath: "",
        popularity: ""
        };
    let data = await APIcall(saveval);
    let genrearray = []; 
    for (let i = 0; i<data.results.length;i++){
        genrearray = [];
        for(let a = 0; a<data.results[i].genre_ids.length; a++){
            let s = customData.genres.filter(customData => customData.id === data.results[i].genre_ids[a]).map(customData => customData.name);
            genrearray.push(a+1+ ": " + s + " ");
        }
        if(data.results[i].title === undefined){
           moviearray = 
            {
            title: data.results[i].name,
            genreid: genrearray,
            posterpath: data.results[i].poster_path,
            popularity: data.results[i].popularity
            }
        } else {
            moviearray = 
            {
            title: data.results[i].title,
            genreid: genrearray,
            posterpath: data.results[i].poster_path,
            popularity: data.results[i].popularity
            }
        }
        switch (saveval){
            case "upcom": 
             UpcomingMovies.push(moviearray);
             break; 
            case "trend":
             TrendingMovies.push(moviearray);  
             break;
            case "recent": 
             RecentMovies.push(moviearray);
            case "toprated": 
            TopratedMovies.push(moviearray);
            default: 
             break;
         }             
    }
}
function APIcall(saveval){
    let fetchresponse;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer '
            }
          };
          if(saveval === "upcom"){
            fetchresponse = fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          } else if (saveval === "trend") { 
            fetchresponse = fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          } else if (saveval === "recent") {
            fetchresponse = fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          } else {
            fetchresponse = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          }
    }
    export {TopratedMovies, RecentMovies, TrendingMovies, UpcomingMovies};