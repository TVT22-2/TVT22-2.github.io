
import React, { useEffect, useState } from "react";
import "./frontpage.css" 
import { MovieDBRegData,ReviewGetter, UpcomingMovies, TrendingMovies, RecentMovies, ReviewArray  } from'../components/DataLoader';
import { userID } from'../components/react-signals';
import { Link } from "react-router-dom";
export default function Frontpage() {
    const [isLoading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchdata = async () => {
            await ReviewGetter();   
            await MovieDBRegData("trend", 1,1)
             .then(()=> MovieDBRegData("upcom", 1,1))
             .then(()=> MovieDBRegData("recent", 1,1))
             .then(()=> setLoading(false))
        }
        fetchdata();
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
        <nav className="navBar">
            <div className="container">
            <ul className="nav">
                <Reviews/>
        </ul>
        </div>
        </nav>
        <button onClick={()=>console.log(userID)}>button</button>
        <br></br>
        <br></br>
        <br></br>
    </>
    );
    } 
    function Reviews(){
        let reviews = [];
        
        for(let i = 1; i<5; i++){
        if(ReviewArray[i]!==undefined){
         reviews.push(
        <div className="FrontpageReviewContainer">
        <Link to={"http://localhost:3000/movie/?" + ReviewArray[i].id}>
        <div className="verticaltextTitle">{ReviewArray[i].movietitle}</div>
        </Link>
        <div className="verticaltextScore">5/{ReviewArray[i].review}</div>
        <div className="verticaltextReview">{ReviewArray[i].content}</div>
        </div>
         );
        } else {
            reviews.push(<>Error with database connection</>)
            break;
        }
        }
    return reviews;
        
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
        if(RecentMovies[index]!==undefined){
        let url = "https://image.tmdb.org/t/p/w500/" + RecentMovies[index].posterpath;
        return (
            <>
            <li className="moviecontainer">
                <Link to={"http://localhost:3000/movie/" + RecentMovies[index].id}>
                <img src={url} alt="bigdogstatus" className="recentImage"></img>
                </Link>
                <article className="movieinfo">
                    <div className="title">{RecentMovies[index].title}</div>
                    <div className="title">{RecentMovies[index].genreid}</div>
                    <div className="title">{RecentMovies[index].popularity}</div>
                </article>
            </li> 
            </>
        );
        } else {
            return <>Error with database connection</>
        }
    }
    function MovieElementVertical(props) {
        let imageurl = "https://image.tmdb.org/t/p/w500/"+ props.imagepath;
        return (
        <div className="verticalcontainer">
        <div className="ImageContainer">
        <Link to={"http://localhost:3000/movie/" + props.id}>
        <img src={imageurl} alt="bigdogstatus" className="elementimage"/>
        </Link>
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
   for (let i = 1; i<=20;i++){
    if(array[i]!==undefined){
    row.push(<MovieElementVertical title={array[i].title} genre={array[i].genreid} popularity={array[i].popularity} imagepath={array[i].posterpath} id={array[i].id}/>)
    } else {
        row.push(<>Error with the connection</>)
        break;
    }
   }
    return row;
  }


