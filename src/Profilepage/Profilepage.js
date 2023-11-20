import React from "react";
import "./Profilepage.css"
import image from "../resources/placeholderimage2.jpg"

function Profilepage() {
    return (
        <div className="Profilepage">
            <OwnReviews />
            <FavouriteMovies />
        </div>
    )
}

function OwnReviews() {

    return (
        <div className="OwnReviews">
            <div className="OwnReviewsHeader">
                <h1 >Own Reviews</h1>
            </div>
            <MovieTitle />
            <Rating />
            <Text />
            <MovieTitle />
            <Rating />
            <Text />
            <Buttons />
        </div>
    );
}

function FavouriteMovies() {
    return (
        <div className="FavouriteMovies">
            <ol>
                <MovieTitle />
                <MovieTitle />
                <MovieTitle />
            </ol>
        </div>
    );
}

function MovieTitle() {
    return (
        <div className="MovieTitle">
            <h2>Movie Title: Garfield</h2>
        </div>
    );
}

function Rating() {
    return (
        <div className="Rating">
            <h3>Rating</h3>
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

function Buttons() {
    return (
        <div className="Buttons">
            <button>Previous</button>
            <button>Next</button>
        </div>
    );
}

export default Profilepage;