import React, { useState } from "react";
import "./Profilepage.css"
import image from "../resources/placeholderimage3.jpg"
import { ReviewGetter, ReviewArray } from '../components/DataLoader';

function Profilepage() {

    const [isLoading, setLoading] = useState(true);

    setTimeout(function () {
        setLoading(false)
    }, 2000);
    if (isLoading) {
        return (
            <>
            </>
        );
    }

    return (
        <div className="Profilepage">
            <OwnReviews />
            <FavouriteMoviesAndGroups />
            <PostsAndNews />
        </div>
    )
}

function OwnReviews() {
    const renderedReviews = [];

    for (let i = 1; i < 3; i++) {
        renderedReviews.push(
            <div key={i} className="ProfilePageReview">
                <MovieTitle Title={ReviewArray[i].movietitle} />
                <Rating Rating={ReviewArray[i].review} />
                <Text Content={ReviewArray[i].content} />
            </div>
        );
    }

    return (
        <div className="OwnReviews">
            <div className="OwnReviewsHeader">
                <h1>Own Reviews</h1>
            </div>
            {renderedReviews}
            <Buttons ButtonLeft="Previous" ButtonRight="Next" />
        </div>);
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
            <Buttons ButtonLeft="Posts" ButtonRight="Newsfeed" />
            <div className="PostsAndNewsHeader">
                <h1>Posts / Newsfeed</h1>
            </div>
            <MovieTitle Title='Placeholder' />
            <Timestamp />
            <Text Content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
            <Image />
            <Buttons ButtonLeft="Previous" ButtonRight="Next" />
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
                <li><MovieTitle Title='Placeholder' /></li>
                <li><MovieTitle Title='Placeholder' /></li>
                <li><MovieTitle Title='Placeholder' /></li>
                <li><MovieTitle Title='Placeholder' /></li>
                <li><MovieTitle Title='Placeholder' /></li>
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
            <Buttons ButtonLeft="Previous" ButtonRight="Next" />
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

function MovieTitle({ Title }) {
    return (
        <div className="MovieTitle">
            <h2>{Title}</h2>
        </div>
    );
}

function Rating({ Rating }) {
    return (
        <div className="Rating">
            <h3>{Rating}/5</h3>
        </div>
    );
}

function Text({ Content }) {
    return (
        <div className="Text">
            <p>{Content}</p>
        </div>
    );
}

function Buttons({ ButtonLeft, ButtonRight }) {
    return (
        <div className="Buttons">
            <button id="ButtonLeft">{ButtonLeft}</button>
            <button id="ButtonRight">{ButtonRight}</button>
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