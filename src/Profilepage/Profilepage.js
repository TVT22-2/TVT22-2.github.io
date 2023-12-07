import React, { useEffect, useState } from "react";
import "./Profilepage.css"
import image from "../resources/placeholderimage3.jpg"
import { idParser } from '../components/DataLoader';
import { userID } from "../components/react-signals";

function Profilepage() {

    if (userID.value === "") {
        return (
            <div className="Profilepage">
                <h1>You must be logged in to view this page</h1>
            </div>
        )
    } else {
        return (
            <div className="Profilepage">
                <OwnReviews />
                <FavouriteMoviesAndGroups />
                <PostsAndNews />
            </div>
        )
    }
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
                console.error('Error fetching data at Profile / OwnReviews:', error);
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
                <p className="Loader">Loading...</p>
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
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentHeaderPage, setCurrentHeaderCurrentPage] = useState(1); // Track if its Posts or Newsfeed
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 1; // Number of reviews to display per page

    // Get posts from the database
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:3001/post/user/${userID}`;
                console.log(url);
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setTotalPages(Math.ceil(data.length / postsPerPage));
                setPosts(data);
            } catch (error) {
                console.error('Error fetching data at Profile / PostsAndNews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    console.log("Total pages = " + totalPages);

    const handlePostPage = () => {
        setCurrentHeaderCurrentPage(1);
    };

    const handleNewsfeedPage = () => {
        setCurrentHeaderCurrentPage(2);
    };

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

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const displayedPosts = posts.slice(startIndex, endIndex);

    return (
        <div className="PostsAndNews">
            <Buttons
                ButtonLeft="Posts"
                ButtonRight="Newsfeed"
                onButtonLeftClick={handlePostPage}
                onButtonRightClick={handleNewsfeedPage}
            />
            <div className="PostsAndNewsHeader">
                {currentHeaderPage === 1 ? (
                    <h1>Posts</h1>
                ) : (
                    <h1>Newsfeed</h1>
                )}
            </div>
            { loading ? (
                <p className="Loader">Loading...</p>
            ) : (  currentHeaderPage === 1 ? (
                displayedPosts.map((post, index) => (
                    <div key={index} className="ProfilePagePost">
                        <ProfileMovieTitle Title={post.title} />
                        <Timestamp Date={post.date} />
                        <Text Content={post.posttext} />
                        <Image />
                    </div>
                ))) : (
                <div className="ProfilePageNewsfeed">
                </div>)
                
            )
            }
            <Buttons
                ButtonLeft="Previous"
                ButtonRight="Next"
                onButtonLeftClick={handlePreviousPage}
                onButtonRightClick={handleNextPage}
            />
        </div>
    );
}

/*Profiilisivun komponentti*/
function FavouriteMovies() {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoritesWithTitles, setfavoritesWithTitles] = useState([]);

    /* Get favorites from the database */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:3001/favorites/${userID}`;
                console.log(url);
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);

                // Limit to 5 favorites
                const limitedFavorites = data.slice(0, 5);
                setFavorites(limitedFavorites);
            } catch (error) {
                console.error('Error fetching data at FavouriteMovies:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    /* Get and Map titles to favorites */
    useEffect(() => {
        const fetchTitles = async () => {
            try {
                console.log('Before fetching titles:', favorites);

                const favoritesWithTitles = await Promise.all(
                    favorites.map(async (favorite) => {
                        const movieDetails = await idParser(favorite.movie_id);
                        return {
                            ...favorite,
                            title: movieDetails.title,
                        };
                    })
                );

                console.log('After fetching titles:', favoritesWithTitles);

                setfavoritesWithTitles(favoritesWithTitles);
            } catch (error) {
                console.error('Error fetching titles:', error);
            }
        };

        fetchTitles();
    }, [favorites]); // Update the favorites whenever the 'favorites' state changes

    return (
        <div className="FavouriteMovies">
            <div className="FavouriteMoviesHeader">
                <h1>Favourite Movies</h1>
            </div>
            <ol className="FavouriteMoviesList">
                {loading ? (
                    <p className="Loader">Loading...</p>
                ) : (
                    favoritesWithTitles.map((favorite, index) => (
                        <li key={index}>
                            <ProfileMovieTitle Title={favorite.title} />
                        </li>
                    )))}
            </ol>
        </div>
    );
}

function Groups() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const groupsPerPage = 5; // Number of reviews to display per page
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:3001/Groups/${userID}`;
                console.log(url);
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setTotalPages(Math.ceil(data.length / groupsPerPage));
                setGroups(data);
            } catch (error) {
                console.error('Error fetching data at Profile / Groups:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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

    const startIndex = (currentPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;
    const displayedGroups = groups.slice(startIndex, endIndex);

    return (
        <div className="Groups">
            <div className="GroupsHeader">
                <h1 >Groups</h1>
            </div>

            <ol className="Groupslist">
                {loading ? (
                    <p className="Loader">Loading...</p>
                ) : (
                    displayedGroups.map((group, index) => (
                        /* Map the groups to the page */
                        <li key={index}>
                            <ProfileGroupName Name={group.name} />
                        </li>
                    ))
                )}
            </ol>

            <Buttons
                ButtonLeft="Previous"
                ButtonRight="Next"
                onButtonLeftClick={handlePreviousPage}
                onButtonRightClick={handleNextPage}
            />
        </div>
    );
}

function ProfileGroupName({ Name }) {
    return (
        <div className="GroupName">
            <h2>{Name}</h2>
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

function Timestamp({ Date }) {
    return (
        <div className="Timestamp">
            <h2>{Date}</h2>
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