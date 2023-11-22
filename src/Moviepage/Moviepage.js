
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
                <MovieTitle />
                <Genres />
            </div>
            <div className="Review">
                <h5>Review</h5>
            </div>
            <div className="AddReview">
                <h5>Add Review</h5>
            </div>
                
            </div>
    );
}

function MovieTitle() {
    return (
        <div className="MovieTitle">
            <h5>Title</h5>
        </div>
    );
}

function Genres() {
    return (
        <div className="MovieTitle">
            <h5>Genres</h5>
        </div>
    );
}

function Rating() {
    return (
        <div className="Rating">
            <h3>Rating: 5/5</h3>
        </div>
    );
}

function Text() {
    return (
        <div className="Text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    );
}

export default moviepage;