import { BearerToken } from './react-signals'
import customData from '../components/genreids.json';
let amountoffetches = 0;
 let UpcomingMovies = [
    {
    id: "",
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
 let TrendingMovies = [
    {
    id: "",
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
 let RecentMovies = [
    {
    id: "",
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
 let TopratedMovies = [
    {
    id: "",
    title: "",
    genreid: "",
    posterpath: "",
    popularity: ""
    }
];
let ReviewArray = [
{
  id: "",
  review: "",
  content: "", 
  movietitle:"",
}
]
async function idParser(movie_id){
  let fetchresponse;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+BearerToken
    }
  };
  fetchresponse = fetch('https://api.themoviedb.org/3/movie/'+movie_id+'?language=en-US', options)
    .then(response => fetchresponse = response.json())
    .catch(err => console.error(err));
   return fetchresponse;
}
 async function ReviewGetter(){
  let data = await Reviewreg();
  data.forEach(async element => {
    let title = await idParser(element.idmovie);
    let review = 
    {
      id: element.idmovie,
      review: element.review,
      content: element.content, 
      movietitle: title.title
    }
    ReviewArray.push(review);
  });
 }
 async function Reviewreg(){
  let data = fetch("http://localhost:3001/getrecentreview")
  .then(response => data = response.json())
  return data; 
 }
 async function MovieDBRegData(saveval, amount, page){ 
  if(BearerToken.length>5){
  amountoffetches = amountoffetches + amount;
  if(amountoffetches>0){
  switch (saveval){
    case "upcom": 
     UpcomingMovies = [
      {
      title: "",
      genreid: "",
      posterpath: "",
      popularity: ""
      }
  ];
     break; 
    case "trend":
      TrendingMovies = [
        {
        title: "",
        genreid: "",
        posterpath: "",
        popularity: ""
        }
    ];
     break;
    case "recent": 
    RecentMovies = [
      {
      title: "",
      genreid: "",
      posterpath: "",
      popularity: ""
      }
  ];
    break;
    case "toprated": 
    TopratedMovies = [
      {
      title: "",
      genreid: "",
      posterpath: "",
      popularity: ""
      }
  ];
     break;
    default: 
     break;
 }             
    let moviearray = {
        title: "",
        genreid: "",
        posterpath: "",
        popularity: ""
        };
    let data = await APIcall(saveval, page);
    let genrearray = []; 
    for (let i = 0; i<data.results.length;i++){
        genrearray = [];
        for(let a = 0; a<data.results[i].genre_ids.length; a++){
            let s = customData.genres.filter(customData => customData.id === data.results[i].genre_ids[a]).map(customData => customData.name);
            genrearray.push(a+1+ ": " + s + "    ");
        }
        if(data.results[i].title === undefined){
           moviearray = 
            {
            id: data.results[i].id,
            title: data.results[i].name,
            genreid: genrearray,
            posterpath: data.results[i].poster_path,
            popularity: data.results[i].popularity
            }
        } else {
            moviearray = 
            {
            id: data.results[i].id,
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
             break;
            case "toprated": 
            TopratedMovies.push(moviearray);
            break;
            default: 
             break;
         }             
    }
  }
} else {
  console.log("Error with the connection")
}
}
function APIcall(saveval, page){
    let fetchresponse;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer '+ BearerToken
            }
          };
          if(saveval === "upcom"){
            fetchresponse = fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page='+page, options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          } else if (saveval === "trend") { 
            fetchresponse = fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          } else if (saveval === "recent") {
            fetchresponse = fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='+page, options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          } else {
            fetchresponse = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page='+page, options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          }
    }
    export {TopratedMovies, RecentMovies, TrendingMovies, UpcomingMovies, MovieDBRegData, ReviewGetter, ReviewArray, idParser};