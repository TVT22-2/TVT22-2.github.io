import placeholder from "../resources/placeholderimage.jpg"
import placeholdergif from "../resources/Loading.gif"
import React, { useEffect, useState } from "react";
import "./frontpage.css"
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
export default function Frontpage() {
    const [isLoading, setLoading] = useState(true); 
    const MakeApiRequests = false;
    useEffect(() => {
        if(UpcomingMovies.length<=1 && MakeApiRequests === true){
            MovieDBReg("trend");
            MovieDBReg("upcom");
        } else {
        setLoading(false);
    }
    }, []);
    if (isLoading) {
    return (
     <>
     <img src={placeholdergif} alt="gif"></img>
     </>
    );
    } 
    if(MakeApiRequests){
    return (
        <>
        <MovieElementHead/>
        <HeaderElement text="treding"/>
        <MovieBrowser text="trend"/>
        <HeaderElement text="upcoming"/>
        <MovieBrowser text="upcom"/>
        <HeaderElement text="recent reviews"/>
        <MovieBrowser/>
        <br></br>
        <br></br>
        <br></br>
    </>
    );
    } else {
     return (
        <>
        <MovieElementHead/>
        <HeaderElement text="treding"/>
        <HeaderElement text="upcoming"/>
        <HeaderElement text="recent reviews"/>
        <br></br>
        <br></br>
        <br></br>
        </>
    );
    } 
    function MovieElementHead(props) {
        return (
            <li className="moviecontainer">
                <img src={placeholder} alt="bigdogstatus" className="recentImage">
                </img>
                <article className="movieinfo">
                    <div className="title">George orwell</div>
                    <div className="title">Fantasy</div>
                    <div className="title">3/5</div>
                </article>
            </li>
            
        );
    }
    function MovieElementVertical(props) {
        let imageurl = "https://image.tmdb.org/t/p/w500/"+ props.imagepath;
        return (
        <div className="verticalcontainer">
        <div className="ImageContainer">
        <img src={imageurl} alt="bigdogstatus" className="elementimage"/>
        </div>
        <div className="verticaltext">Title: {props.title}</div>
        <div className="verticaltext">GenreId: {props.genre}</div>
        <div className="verticaltext">Popularity: {props.popularity}</div>
        </div>
        );
    }
    function HeaderElement(props) {
        return (
            <div className="headingelement">
            <h className="Movieheading">{props.text}</h>
            </div>
        );
    }
     function MovieBrowser(props){
        if(props.text === "upcom"){
        return (
            <nav className="navBar">
            <div className="container">
            <ul className="nav">
            <MovieElementRender var = {props.text}/>
            </ul>
            </div>
            </nav>
            );
        }
        if(props.text === "trend"){
            return (
                <nav className="navBar">
                <div className="container">
                <ul className="nav">
                <MovieElementRender var = {props.text}/>
                </ul>
                </div>
                </nav>
                );
        }
    }
  function MovieElementRender(props){
    let row = [];
    if(props.var === "trend"){
    for (let i = 1; i<=10;i++){
     row.push(<MovieElementVertical title={TrendingMovies[i].title} genre={TrendingMovies[i].genreid} popularity={TrendingMovies[i].popularity} imagepath={TrendingMovies[i].posterpath}/>)
    }
}else if(props.var === "upcom"){
    for (let i = 1; i<=10;i++){
        row.push(<MovieElementVertical title={UpcomingMovies[i].title} genre={UpcomingMovies[i].genreid} popularity={UpcomingMovies[i].popularity} imagepath={UpcomingMovies[i].posterpath}/>)
       }
}
    return row;
  }
  function APIcall(saveval){
    let fetchresponse;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer'
            }
          };
          if(saveval === "upcom"){
            fetchresponse = fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          } else { 
            fetchresponse = fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
            return fetchresponse
          }
    }
    function getGenreId(){
        let fetchresponse;
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer'
            }
          };
          
          fetchresponse = fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
        return fetchresponse;
    }
    async function MovieDBReg(saveval){
        let moviearray = {
            title: "",
            genreid: "",
            posterpath: "",
            popularity: ""
            };
        let data = await APIcall(saveval);
        for (let i = 0; i<10;i++){
            if(data.results[i].title === undefined){
               moviearray = 
                {
                title: data.results[i].name,
                genreid: data.results[i].genre_ids[0],
                posterpath: data.results[i].poster_path,
                popularity: data.results[i].popularity
                }
            } else {
                moviearray = 
                {
                title: data.results[i].title,
                genreid: data.results[i].genre_ids[0],
                posterpath: data.results[i].poster_path,
                popularity: data.results[i].popularity
                }
            }
             if(saveval === "upcom"){
             UpcomingMovies.push(moviearray);
             } 
             if(saveval === "trend"){
             TrendingMovies.push(moviearray);
             }
        }
        if(UpcomingMovies.length>10 && TrendingMovies.length>10){
        setLoading(false);
        }
    }
}
