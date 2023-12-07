import React, { useEffect, useState } from "react";
import "./Profilepage.css"
import { idParser } from '../components/DataLoader';
import { userID } from "../components/react-signals";
import { Image, Timestamp, ButtonsPostsAndNewsfeed, Buttons, ProfileGroupName, ProfileMovieTitle, Rating, Text } from "./ProfilepageComponents.js";

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

    const handlePostPage = () => {
        setCurrentHeaderCurrentPage(1);
    };

    const HandleNewPost = () => {
        setCurrentHeaderCurrentPage(3);
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
                {(() => {
                    switch (currentHeaderPage) {
                        case 1:
                            return <h1>Posts</h1>;
                        case 2:
                            return <h1>Newsfeed</h1>;
                        case 3:
                            return <h1>New Post</h1>;
                        default:
                            return null;
                    }
                })()}
            </div>

            {loading ? (
                <p className="Loader">Loading...</p>
            ) : (() => {
                switch (currentHeaderPage) {
                    case 1:
                        return (
                            <div>
                                {displayedPosts.map((post, index) => (
                                    <div key={index} className="ProfilePagePost">
                                        <ProfileMovieTitle Title={post.title} />
                                        <Timestamp Date={post.date} />
                                        <Text Content={post.posttext} />
                                        <Image />
                                    </div>
                                ))}
                            </div>
                        );
                    case 2:
                        return <div className="ProfilePageNewsfeed"></div>;
                    case 3:
                        return <NewPost onButtonCancelClick={handlePostPage}/>;
                    default:
                        return null;
                }
            })()}
            <ButtonsPostsAndNewsfeed
                ButtonLeft="Previous"
                ButtonMiddle="New Post"
                ButtonRight="Next"
                onButtonLeftClick={handlePreviousPage}
                onButtonMiddleClick={HandleNewPost}
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

function NewPost( {onButtonCancelClick}) {

    const initialDetails = {
        title: "",
        posttext: "",
        date: new Date().toISOString(),
        end_user_id: userID
    };

    const [details, setDetails] = useState(initialDetails);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value }
        })
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        fetch('http://localhost:3001/post/insertPostUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details)

        }).then(() => {
            console.log('New post added');
            setDetails(initialDetails);
            window.location.reload();
        })
    }

    return (
        <div className="NewPost">
            <form onSubmit={submitHandler} className="NewPostForm">
                <h3>Title:</h3>
                <input
                    type='title'
                    name="title"
                    placeholder="Add title"
                    value={details.title}
                    onChange={handleChange}
                    className="InputField"
                />
                <h3>Content:</h3>
                <textarea
                    name="posttext"
                    placeholder="Add text"
                    value={details.posttext}
                    onChange={handleChange}
                    className="InputField"
                />
                <button type="submit" id="ButtonSubmit" className="NewPostButtons">
                    Add post</button>
                <button type="submit" id="ButtonCancel" className="NewPostButtons" onClick={onButtonCancelClick}>
                    Cancel</button>
            </form>
        </div>
    )
}
export default Profilepage;