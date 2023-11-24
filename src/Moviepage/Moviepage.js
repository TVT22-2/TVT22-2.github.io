
import React from "react";
import "./moviepage.css"


function moviepage() {
    return (
        <div className="Moviepage">
            <AvgScore />
            <InfoFooter />
        </div>
    )
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
                    <h5>Add Review</h5>
                </div>
        </div>
    );
}


function Movie() {
    return (
        <div className="Movie">
            <h5>Title</h5>
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
            <h5>Meant for adults??</h5>
        </div>
    );
}

function ReleaseDate() {
    return (
        <div className="Movie">
            <h5>Release date</h5>
        </div>
    );
}

function Thumbnail() {
    return (
        <div className="ThumbnailContainer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg" alt="Thumbnail" className="thumbnail-image" />
        </div>
    );
}

function Description() {
    return (
        <div className="Description">
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
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

export default moviepage;