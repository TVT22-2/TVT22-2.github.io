import placeholdergif from "../resources/Loading.gif"
import React, { useEffect, useState } from "react";
import "./frontpage.css" 
import { MovieDBRegData, UpcomingMovies, TrendingMovies, RecentMovies  } from'../components/DataLoader';
export default function Frontpage() {
    const [isLoading, setLoading] = useState(true); 
    useEffect(() => {
            MovieDBRegData("trend", 1,1);
            MovieDBRegData("upcom", 1,1);
            MovieDBRegData("recent", 1,1);
    setTimeout(function() {
        setLoading(false)
       }, 1000);
    }, []);
    if (isLoading) {
    return (
     <>
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
    } 
    function MovieElementHead() {
        let [index, setIndex] = useState(1);
        setTimeout(function() {
            if(index<10){
               setIndex(++index);
            } else {
                setIndex(1);    
            }
        }, 8000);
        let url = "https://image.tmdb.org/t/p/w500/" + RecentMovies[index].posterpath;
        return (
            <>
            <li className="moviecontainer">
                <img src={url} alt="bigdogstatus" className="recentImage">
                </img>
                <article className="movieinfo">
                    <div className="title">{RecentMovies[index].title}</div>
                    <div className="title">{RecentMovies[index].genreid}</div>
                    <div className="title">{RecentMovies[index].popularity}</div>
                </article>
            </li> 
            </>
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
    let array = [];
    if(props.var === "trend"){
    array = TrendingMovies;
    }else if(props.var === "upcom"){
    array = UpcomingMovies;
    }
for (let i = 1; i<=10;i++){
    row.push(<MovieElementVertical title={array[i].title} genre={array[i].genreid} popularity={array[i].popularity} imagepath={array[i].posterpath}/>)
   }
    return row;
  }

