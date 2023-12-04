import React, { useEffect, useState } from "react";
import "./Profilepage.css"
import image from "../resources/placeholderimage3.jpg"
import { idParser } from '../components/DataLoader';
import { BearerToken, userID } from "../components/react-signals";

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

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewsWithTitles, setReviewsWithTitles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const reviewsPerPage = 2; // Number of reviews to display per page
    const [totalPages, setTotalPages] = useState(1);

    /* Get reviews from the database */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:3001/getownreview/${userID}`;
                console.log(url);
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setTotalPages(Math.ceil(data.length / reviewsPerPage));
                setReviews(data);
            } catch (error) {
                console.error('Error fetching data at OwnReviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    /* Get and Map titles to reviews */
    useEffect(() => {
        const fetchTitles = async () => {
            try {
                console.log('Before fetching titles:', reviews);

                const reviewsWithTitles = await Promise.all(
                    reviews.map(async (review) => {
                        const movieDetails = await idParser(review.idmovie);
                        return {
                            ...review,
                            title: movieDetails.title,
                        };
                    })
                );

                console.log('After fetching titles:', reviewsWithTitles);

                setReviewsWithTitles(reviewsWithTitles);
            } catch (error) {
                console.error('Error fetching titles:', error);
            }
        };

        fetchTitles();
    }, [reviews]); // Update the reviews whenever the 'reviews' state changes

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const displayedReviews = reviewsWithTitles.slice(startIndex, endIndex);

    return (
        <div className="OwnReviews">
            <div className="OwnReviewsHeader">
                <h1>Own Reviews</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                displayedReviews.map((review, index) => (
                    /* Map the reviews to the page */
                    <div key={index} className="ProfilePageReview">
                        <ProfileMovieTitle Title={review.title} />
                        <Rating Rating={review.review} />
                        <Text Content={review.content} />
                    </div>
                ))
            )}

            <Buttons
                ButtonLeft="Previous"
                ButtonRight="Next"
                onButtonLeftClick={handlePreviousPage}
                onButtonRightClick={handleNextPage}
            />
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
            <Buttons ButtonLeft="Posts" ButtonRight="Newsfeed" />
            <div className="PostsAndNewsHeader">
                <h1>Posts / Newsfeed</h1>
            </div>
            <ProfileMovieTitle Title='Placeholder' />
            <Timestamp />
            <Text Content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
            <Image />
            <Buttons ButtonLeft="Previous" ButtonRight="Next" />
        </div>
    );
}

/*Profiilisivun komponentti*/
function FavouriteMovies() {
    return (
        <div className="FavouriteMovies">
            <div className="FavouriteMoviesHeader">
                <h1>Favourite Movies</h1>
            </div>
            <ol className="FavouriteMoviesList">
                <li><ProfileMovieTitle Title='Placeholder' /></li>
                <li><ProfileMovieTitle Title='Placeholder' /></li>
                <li><ProfileMovieTitle Title='Placeholder' /></li>
                <li><ProfileMovieTitle Title='Placeholder' /></li>
                <li><ProfileMovieTitle Title='Placeholder' /></li>
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

function ProfileMovieTitle({ Title }) {
    return (
        <div className="ProfileMovieTitle">
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

function Buttons({ ButtonLeft, ButtonRight, onButtonLeftClick, onButtonRightClick }) {
    return (
        <div className="Buttons">
            <button id="ButtonLeft" onClick={onButtonLeftClick}>
                {ButtonLeft}</button>
            <button id="ButtonRight" onClick={onButtonRightClick}>
                {ButtonRight}</button>
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