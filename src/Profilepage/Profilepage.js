import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Profilepage.css";
import { idParser } from '../components/DataLoader';
import { userID, token } from "../components/react-signals";
import {
    Timestamp,
    AddNewsToProfileButtonAndLink,
    DeleteReviewButton,
    DeletePostButton,
    Buttons,
    ButtonsPostsAndNewsfeed,
    ProfileGroupName,
    ProfileMovieTitle,
    Rating,
    Text,
    ButtonsGroups,
    ButtonOpenEditPost
} from "./ProfilepageComponents.js";

function Profilepage() {
    const navigate = useNavigate();

    // Placeholder for checking if the user is logged in
    /*if (userID.value === "" || userID.value === null) {
        return (
            <div className="Profilepage">
                <h1>You must be logged in to view this page</h1>
            </div>
        )
    } else {
        return (
            <>
                <div className="Profilepage">
                    <OwnReviews />
                    <FavouriteMoviesAndGroups />
                    <PostsAndNews />
                </div>
                <button onClick={Deletion}>hello</button>
            </>
        )
    }*/

    return (
        <>
            <div className="Profilepage">
                <OwnReviews />
                <FavouriteMoviesAndGroups />
                <PostsAndNews />
            </div>
            <div className="ButtonDeleteContainer">
                <button className="ButtonDelete" id="ButtonDelete" onClick={Deletion}>Delete Profile</button>
            </div>
        </>
    )

    async function Deletion() {
        let userid = userID.value;
        //console.log(userid);
        const confirmation = window.confirm("Are you sure you want to delete your profile?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3001/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userid })
            });
            userID.value = "";
            token.value = "";
            navigate("/");
            if (response) {
            }
        } else {
            alert("Cancelled")
        }
    }
}

function OwnReviews() {
    const { userId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewsWithTitles, setReviewsWithTitles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const reviewsPerPage = 2; // Number of reviews to display per page
    const [totalPages, setTotalPages] = useState(1);

    /* Get reviews from the database */
    const fetchData = async () => {
        setLoading(true);
        try {
            let url = `http://localhost:3001/getownreviewbydate/${userId}`;
            const response = await fetch(url);
            const data = await response.json();
            //console.log(data);
            setTotalPages(Math.ceil(data.length / reviewsPerPage));
            setReviews(data);
        } catch (error) {
            console.error('Error fetching data at Profile / OwnReviews:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    /* Get and Map titles to reviews */
    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const reviewsWithTitles = await Promise.all(
                    reviews.map(async (review) => {
                        const movieDetails = await idParser(review.idmovie);
                        return {
                            ...review,
                            title: movieDetails.title,
                        };
                    })
                );
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
                        <DeleteReviewButton reviewID={review.id} fetchReviews={fetchData} />
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
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentHeaderPage, setCurrentHeaderCurrentPage] = useState(1); // Track which page is currently displayed (Posts, Newsfeed, New Post)
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPostPages, setTotalPostPages] = useState(1);
    const [totalNewsPages, setTotalNewsPages] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const postsPerPage = 1;
    const newsPerPage = 2;

    // Get posts from the database
    const fetchPosts = async () => {
        setLoading(true);
        try {
            let url = `http://localhost:3001/post/userByDate/${userId}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data[0]);
            let urlParsed = [];
            for (let i = 0; i < data.length; i++) {
                let temparray = [];
                const link = (data[i].posttext.split("https"));
                temparray = {
                    id: data[i].id,
                    title: data[i].title,
                    date: data[i].date,
                    posttext: link[0],
                    link: "https" + link[1]
                }
                urlParsed.push(temparray);
            }
            console.log(urlParsed);
            setTotalPostPages(Math.ceil(data.length / postsPerPage));
            setPosts(urlParsed);
        } catch (error) {
            console.error('Error fetching data at Profile / Posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();

        // Get news from API
        const fetchNews = async () => {
            setLoading(true);
            try {
                let url = "https://www.finnkino.fi/xml/News/";
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": "application/xml; charset=utf-8",
                    },
                });

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");

                //console.log(xmlDoc);

                const articles = xmlDoc.querySelectorAll("NewsArticle");
                //console.log("XML Content:", xmlDoc.documentElement.outerHTML);
                //console.log("Articles NodeList:", articles);*/
                const extractedNews = Array.from(articles).map((article) => ({
                    title: article.querySelector("Title").textContent,
                    date: article.querySelector("PublishDate").textContent,
                    content: article.querySelector("HTMLLead").textContent,
                    link: article.querySelector("ArticleURL").textContent,
                }));

                setTotalNewsPages(Math.ceil(extractedNews.length / newsPerPage));
                setNews(extractedNews);
            } catch (error) {
                console.error("Error fetching data at Profile / News:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePostPage = () => {
        setCurrentHeaderCurrentPage(1);
    };

    const HandleNewPost = () => {
        setCurrentHeaderCurrentPage(3);
    };

    const HandleEditPost = () => {
        setIsEditing(true);
    };

    const handleCancelEditClick = () => {
        setIsEditing(false);
    };

    const handleNewsfeedPage = () => {
        setCurrentHeaderCurrentPage(2);
    };

    const handleNextPage = () => {
        if (currentHeaderPage === 1) {
            if (currentPage < totalPostPages) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        } else if (currentHeaderPage === 2) {
            if (currentPage < totalNewsPages) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * (currentHeaderPage === 1 ? postsPerPage : newsPerPage);
    const endIndex = startIndex + (currentHeaderPage === 1 ? postsPerPage : newsPerPage);
    const displayedItems = currentHeaderPage === 1 ? posts.slice(startIndex, endIndex) : news.slice(startIndex, endIndex);

    return (
        <>
            <div className="PostsAndNews">
                {/* Buttons component for selecting Posts, New Post, or Newsfeed */}
                <Buttons
                    ButtonLeft="Posts"
                    ButtonMiddle="New Post"
                    ButtonRight="Newsfeed"
                    onButtonLeftClick={handlePostPage}
                    onButtonRightClick={handleNewsfeedPage}
                />
                {/* Header for displaying "Posts", "Newsfeed", or "New Post" */}
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

                {/* Content based on the selected page */}
                {loading ? (
                    <p className="Loader">Loading...</p>
                ) : (() => {
                    switch (currentHeaderPage) {
                        case 1:
                            return (
                                <div>
                                    {displayedItems.map((post, index) => (
                                        <div key={index} className="ProfilePagePosts">
                                            {post.link !== "httpsundefined" ?
                                                <Link to={post.link} className="NewsfeedLink"><ProfileMovieTitle Title={post.title} /></Link>
                                                : <ProfileMovieTitle Title={post.title} />}
                                            <Timestamp date={post.date} />
                                            <Text Content={post.posttext} />
                                            <div className="ButtonDeleteAndEditPost">
                                                <DeletePostButton postID={post.id} fetchPosts={fetchPosts} />
                                                {/* Toggle rendering based on isEditing */}
                                                {isEditing ? (
                                                    <EditPostButton
                                                        postID={post.id}
                                                        fetchPosts={fetchPosts}
                                                        postText={post.posttext}
                                                        postTitle={post.title}
                                                        onButtonCancelEditClick={handleCancelEditClick}
                                                    />
                                                ) : (
                                                    <ButtonOpenEditPost
                                                        ButtonOpenEditPost="Edit Post"
                                                        onButtonOpenEditPostClick={HandleEditPost}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        case 2:
                            return <div>
                                {displayedItems.map((article, index) => (
                                    <div key={index} className="ProfilePageNews">
                                        <ProfileMovieTitle Title={article.title} />
                                        <Timestamp date={article.date} />
                                        <Text Content={article.content} />
                                        <AddNewsToProfileButtonAndLink ButtonText={"Add to profile"} article={article} userIdUrl={userId} fetchPosts={fetchPosts} />
                                    </div>
                                ))}
                            </div>;
                        case 3:
                            return <NewPost onButtonCancelClick={handlePostPage} fetchPosts={fetchPosts} />;
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
        </>
    );
}

function FavouriteMovies() {

    const { userId } = useParams();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoritesWithTitles, setfavoritesWithTitles] = useState([]);

    /* Get favorites from the database */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:3001/favorites/${userId}`;
                const response = await fetch(url);
                const data = await response.json();
                //console.log(data);

                setFavorites(data);
            } catch (error) {
                console.error('Error fetching data at FavouriteMovies:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    /* Get and Map titles to favorites */
    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const favoritesWithTitles = await Promise.all(
                    favorites.map(async (favorite) => {
                        const movieDetails = await idParser(favorite.movie_id);
                        return {
                            ...favorite,
                            title: movieDetails.title,
                        };
                    })
                );
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

    const { userId } = useParams();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const groupsPerPage = 5; // Number of reviews to display per page
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:3001/Groups/${userId}`;
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
    }, [userId]);

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
                            <Link to={`http://localhost:3000/Groupspage/${group.id}`} ><ProfileGroupName Name={group.name} /></Link>
                        </li>
                    ))
                )}
            </ol>

            <ButtonsGroups
                ButtonLeft="Previous"
                ButtonMiddle="Copy Profile Link"
                ButtonRight="Next"
                onButtonLeftClick={handlePreviousPage}
                onButtonRightClick={handleNextPage}
            />
        </div>
    );
}

function NewPost({ fetchPosts, onButtonCancelClick }) {

    const initialDetails = {
        title: "",
        posttext: "",
        date: new Date().toISOString(),
        end_user_id: userID
    };

    const [details, setDetails] = useState(initialDetails);
    const [error, setError] = useState(null);
    const { userId } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (userID != userId) {
            setError("You cannot add posts to another user's profile.");
            return;
        } else if (userID === "" || userID === null || userID === undefined) {
            setError("You must be logged in to add a post.");
            return;

        } else {
            fetch('http://localhost:3001/post/insertPostUser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(details)
            }).then(() => {
                setDetails(initialDetails);
                fetchPosts();
            }).catch((error) => {
                console.error('Error adding new post:', error);
                // Handle error appropriately, e.g., setError("Failed to add new post.")
            });
        }
    };

    return (
        <div className="NewPost">
            {error && <div className="ErrorMessage">{error}</div>}
            <form onSubmit={submitHandler} className="NewPostForm">
                <h3>Title:</h3>
                <input
                    type='title'
                    name="title"
                    placeholder="Add title"
                    value={details.title}
                    onChange={handleChange}
                    className="InputTitleField"
                />
                <h3>Content:</h3>
                <textarea
                    name="posttext"
                    placeholder="Add text"
                    value={details.posttext}
                    onChange={handleChange}
                    rows={10}
                    className="InputContentField"
                />
                <button type="submit" id="ButtonSubmit" className="NewPostButtons">
                    Add post
                </button>
                <button type="button" id="ButtonCancel" className="NewPostButtons" onClick={onButtonCancelClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

function EditPostButton({ postID, fetchPosts, postText, postTitle, onButtonCancelEditClick }) {
    const { userId } = useParams();
    const [details, setDetails] = useState({
        title: postTitle,
        posttext: postText,
        end_user_id: userID,
        id: postID
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value };
        });
    };

    console.log("USER:" + userID);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (userID != userId) {
            setError("You cannot edit another user's posts.");
            return;
        } else if (userID === "" || userID === null || userID === undefined) {
            setError("You must be logged in to edit a post.");
            return;
        } else {
            fetch('http://localhost:3001/post/updatePostUser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details),
            })
                .then(() => {
                    setDetails({
                        title: postTitle,
                        posttext: postText,
                        end_user_id: userID,
                        id: postID
                    });
                    fetchPosts();
                })
                .catch((error) => {
                    console.error('Error updating post:', error);
                    setError('Failed to update post.');
                });
        }
    };

    return (
        <div className="EditPost">
            {error && <div className="ErrorMessage">{error}</div>}
            <form onSubmit={submitHandler} className="EditPostForm">
                <h3>Title:</h3>
                <input
                    type="title"
                    name="title"
                    placeholder="Edit title"
                    value={details.title}
                    onChange={handleChange}
                    className="InputTitleField"
                />
                <h3>Content:</h3>
                <textarea
                    name="posttext"
                    placeholder="Edit text"
                    value={details.posttext}
                    onChange={handleChange}
                    className="InputContentField"
                />
                <button type="submit" id="ButtonSubmit" className="NewPostButtons">
                    Edit post
                </button>
                <button type="button" id="ButtonCancel" className="NewPostButtons" onClick={onButtonCancelEditClick}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default Profilepage;