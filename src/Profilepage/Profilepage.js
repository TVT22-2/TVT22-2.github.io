import React from "react";
import "./Profilepage.css"
import image from "../resources/placeholderimage3.jpg"

function Profilepage() {
    return (
        <div className="Profilepage">
            <OwnReviews />
            <FavouriteMoviesAndGroups />
            <PostsAndNews />
        </div>
    )
}

function OwnReviews() {

    return (
        <div className="OwnReviews">
            <div className="OwnReviewsHeader">
                <h1>Own Reviews</h1>
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

function FavouriteMoviesAndGroups() {
    return (
        <div className="FavouriteMoviesAndGroups">
            <FavouriteMovies />
            <Groups />
        </div>
    );
}

function PostsAndNews() {
    return (
        <div className="PostsAndNews">
            <Buttons />
            <div className="PostsAndNewsHeader">
                <h1>Posts / Newsfeed</h1>
            </div>
            <MovieTitle />
            <Timestamp />
            <Text />
            <Image />
            <Buttons />
        </div>
    );
}

function FavouriteMovies() {
    return (
        <div className="FavouriteMovies">
            <div className="FavouriteMoviesHeader">
                <h1>Favourite Movies</h1>
            </div>
            <ol className="FavouriteMoviesList">
                <li><MovieTitle /></li>
                <li><MovieTitle /></li>
                <li><MovieTitle /></li>
                <li><MovieTitle /></li>
                <li><MovieTitle /></li>
            </ol>
        </div>
    );
}

function Groups() {
    return (
        <div className="Groups">
            <div className="GroupsHeader">
                <h1 >Groups</h1>
            </div>
            <ul className="GroupsList">
                <li><GroupName /></li>
                <li><GroupName /></li>
                <li><GroupName /></li>
                <li><GroupName /></li>
                <li><GroupName /></li>
            </ul>
            <Buttons />
        </div>
    );
}

function GroupName() {
    return (
        <div className="GroupName">
            <h2>Group</h2>
        </div>
    );
}

function MovieTitle() {
    return (
        <div className="MovieTitle">
            <h2>Title</h2>
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

function Buttons() {
    return (
        <div className="Buttons">
            <button id="ButtonPrevious">Previous</button>
            <button id="ButtonNext">Next</button>
        </div>
    );
}

function Timestamp() {
    return (
        <div className="Timestamp">
            <h2>Timestamp</h2>
        </div>
    );
}

function Image() {
    return (
        <div className="Image">
            <img src={image} alt="placeholder" className="placeholderImage" />
        </div>
    )
}

export default Profilepage;