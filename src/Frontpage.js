import placeholder from "./resources/placeholderimage.jpg"
import placeholdergif from "./resources/Loading.gif"
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
    useEffect(() => {
        if(UpcomingMovies.length<=1){
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
    function MovieElementHead(props) {

        return (
            <li className="moviecontainer">
                <img src={placeholder} alt="bigdogstatus" className="elementimage">
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
        <div className="verticaltext">{props.title}</div>
        <div className="verticaltext">{props.genre}</div>
        <div className="verticaltext">{props.popularity}</div>
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
            <MovieElementVertical title={UpcomingMovies[1].title} genre={UpcomingMovies[1].genreid} popularity={UpcomingMovies[1].popularity} imagepath={UpcomingMovies[1].posterpath}/>
            <MovieElementVertical title={UpcomingMovies[2].title} genre={UpcomingMovies[2].genreid} popularity={UpcomingMovies[2].popularity} imagepath={UpcomingMovies[2].posterpath}/>
            <MovieElementVertical title={UpcomingMovies[3].title} genre={UpcomingMovies[3].genreid} popularity={UpcomingMovies[3].popularity} imagepath={UpcomingMovies[3].posterpath}/>
            <MovieElementVertical title={UpcomingMovies[4].title} genre={UpcomingMovies[4].genreid} popularity={UpcomingMovies[4].popularity} imagepath={UpcomingMovies[4].posterpath}/>
            <MovieElementVertical title={UpcomingMovies[5].title} genre={UpcomingMovies[5].genreid} popularity={UpcomingMovies[5].popularity} imagepath={UpcomingMovies[5].posterpath}/>
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
                <MovieElementVertical title={TrendingMovies[1].title} genre={TrendingMovies[1].genreid} popularity={TrendingMovies[1].popularity} imagepath={TrendingMovies[1].posterpath}/>
                <MovieElementVertical title={TrendingMovies[2].title} genre={TrendingMovies[2].genreid} popularity={TrendingMovies[2].popularity} imagepath={TrendingMovies[2].posterpath}/>
                <MovieElementVertical title={TrendingMovies[3].title} genre={TrendingMovies[3].genreid} popularity={TrendingMovies[3].popularity} imagepath={TrendingMovies[3].posterpath}/>
                <MovieElementVertical title={TrendingMovies[4].title} genre={TrendingMovies[4].genreid} popularity={TrendingMovies[4].popularity} imagepath={TrendingMovies[4].posterpath}/>
                <MovieElementVertical title={TrendingMovies[5].title} genre={TrendingMovies[5].genreid} popularity={TrendingMovies[5].popularity} imagepath={TrendingMovies[5].posterpath}/>
                </ul>
                </div>
                </nav>
                );
        }
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
    async function MovieDBReg(saveval){
        let moviearray = {
            title: "",
            genreid: "",
            posterpath: "",
            popularity: ""
            };
        let data = await APIcall(saveval);
        for (let i = 0; i<5;i++){
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
        if(UpcomingMovies.length>5 && TrendingMovies.length>5){
        setLoading(false);
        }
    }
}
