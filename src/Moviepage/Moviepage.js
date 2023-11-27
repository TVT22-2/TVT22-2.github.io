import placeholdergif from "../resources/Loading.gif"
import React, { useState, useEffect } from 'react';
import "./moviepage.css"


var movieid = 3052;

let MovieDatas = [
    {
    title: "",
    genreid: "",
    PG:"",
    ReleaseDate:"",
    posterpath: "",
    overview: "",
    }
];

function Test(){

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '
        }
      };
    
      let fetchresult;
      fetchresult = fetch('https://api.themoviedb.org/3/movie/'+ movieid, options)
      .then(response => fetchresult = response.json())
      .catch(err => console.error(err));
      return fetchresult;
}

async function GetDatas(){

    let get = await Test();
    MovieDatas = {
        title: get.title,
        genreid: "",
        PG: get.adult,
        ReleaseDate: get.release_date,
        overview: get.overview,
        posterpath: get.poster_path
    }
    console.log(MovieDatas);
    console.log(get)
}


function Moviepage() {
    
    const [isLoading, setLoading] = useState(true); 
    useEffect(() => {
    GetDatas();
    setTimeout(function() {
        setLoading(false)
       }, 1000);
    }, []);
    if (isLoading) {
        return (
         <>
         <img src={placeholdergif} alt="gif"></img>
         </>
        );
        } else{
            return (
                <div className="Moviepage">
                    <AvgScore />
                    <InfoFooter />
                </div>
            )
        }

}

function AvgScore() {

    return (
        <div className="AvgScore">
                <h2>Average score: </h2>
            </div>
    );
}

function InfoFooter() {
    return (
        <div className="InfoFooter">
            <div className="MovieDetail">
            <div className="MovieInformation">
                <div className="MovieDetailContent">
                    <Movie />
                    <Genres />
                    <PG />
                    <ReleaseDate />
                </div>
                    <Thumbnail />
                </div>
                    <Description />
                </div>
                <div className="Review">
                    <ReviewsHeader />
                </div>
                <div className="AddReview">
                    <AddReviewsHeader />
                </div>
        </div>
    );
}



function Movie() {
    return (
        <div className="Movie">
            <h5>{MovieDatas.title}</h5>
        </div>
    );
}


function Genres() {
    return (
        <div className="Movie">
            <h5>Genres</h5>
        </div>
    );
}

function PG() {
    return (
        <div className="Movie">
            {MovieDatas.PG === true ? <h5>Tarkoitettu aikuisille</h5> : <h5>Kaiken ikäisille</h5>}
        </div>
    );
}

function ReleaseDate() {
    return (
        <div className="Movie">
            <h5>{MovieDatas.ReleaseDate}</h5>
        </div>
    );
}

function Thumbnail() {
    let MovieURL = "https://image.tmdb.org/t/p/w500/" + MovieDatas.posterpath;
    return (
        <div className="ThumbnailContainer">
            <div className="img">
                <img src={MovieURL} alt="Poster not found" className="thumbnail-image" />
            </div>
        </div>
    );
}

function Description() {
    return (
        <div className="Description">
            <h5>{MovieDatas.overview}</h5>
        </div>
    );
}

function ReviewsHeader() {
    return (
        <div className="ReviewsHeader">
            <h4>Reviews</h4>
        </div>
    );
}

function AddReviewsHeader() {
    return (
        <div className="AddReviewsHeader">
            <h4>Add Reviews</h4>
        </div>
    );
}

export default Moviepage;