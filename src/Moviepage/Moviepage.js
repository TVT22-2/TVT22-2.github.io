import React, { useState, useEffect } from 'react';
import { BearerToken, userID } from '../components/react-signals.js';
import { useParams } from 'react-router-dom';
import placeholdergif from '../resources/Loading.gif';
import "./moviepage.css"
import "../components/genreids.json"

let isFavoriteVar = "";

async function Fetch(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+ BearerToken
        },
    };
    let fetchresponse;
    let location = window.location.pathname.slice(0, 3);
    if(location==="/mo"){
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        .then(response => fetchresponse = response.json())
        .catch((err) => console.error(err));
        return fetchresponse;
    } else {
        await fetch(`https://api.themoviedb.org/3/tv/${movieId}`, options)
        .then(response => fetchresponse = response.json())
        .catch((err) => console.error(err));
        return fetchresponse;
    }
}
async function GetMovieData(movieId) {
    const movieData = await Fetch(movieId);
    if(movieData.title !== undefined){
    return {
        title: movieData.title,
        genreid: movieData.genres,
        PG: movieData.adult,
        ReleaseDate: movieData.release_date,
        overview: movieData.overview,
        posterpath: movieData.poster_path,
    };
    } else {
    return {
        title: movieData.name,
        genreid: movieData.genres,
        PG: movieData.adult,
        ReleaseDate: movieData.first_air_date,
        overview: movieData.overview,
        posterpath: movieData.poster_path,
    };
}
}

async function GetReviews(movieId) {
    const response = await fetch(`http://localhost:3001/getmoviereview/${movieId}`);
    const reviews = await response.json();
    return reviews;
}

async function GetReviewsByRating(movieId){
    const response = await fetch(`http://localhost:3001/getmoviereviewbyrating/${movieId}`)
    const reviews = await response.json();
    return reviews;
}


function Moviepage() {
    window.scrollTo(0, 0)
    const { movieId } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [averageScore, setAverageScore] = useState(0);
    const [movieData, setMovieData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handlePrevReview = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + reviews.length) % reviews.length;
            return newIndex;
        });
    };

    const [sortingOption, setSortingOption] = useState('rating');

    const handleSortingChange = (event) => {
        setSortingOption(event.target.value);
        setCurrentIndex(0);
    };

    useEffect(() => {
        async function fetchData() {
            let movie;

            try {
                movie = await GetMovieData(movieId);
                const fetchedReviews = sortingOption === 'rating' ? await GetReviewsByRating(movieId) : await GetReviews(movieId);

                setMovieData(movie);
                setReviews(fetchedReviews);

                const totalScore = fetchedReviews.reduce((acc, review) => acc + review.review, 0);
                const avgScore = fetchedReviews.length > 0 ? totalScore / fetchedReviews.length : 0;
                setAverageScore(avgScore);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [movieId, sortingOption]);


    if (isLoading) {
        return <img src={placeholdergif} alt="gif" />;
    } else {
        return (
            <div className="Moviepage">
                <AvgScore averageScore={averageScore} />
                <InfoFooter
                    movieData={movieData}
                    reviews={reviews}
                    currentIndex={currentIndex}
                    handleNextReview={handleNextReview}
                    handlePrevReview={handlePrevReview}
                    handleSortingChange={handleSortingChange}
                    sortingOption={sortingOption}
                />
                {window.location.pathname.slice(0, 3) === "/mo" ? <>
                    <div className='AddRemoveFavoritesConteiner'>
                        <AddFavorite movieId={movieId} />
                    </div>
                </> 
                : <></>}
            </div>
        );
    }
}

function ReviewContent({ reviews, currentIndex }) {
    if (!reviews || reviews.length === 0) {
        return <div></div>;
    }

    const currentReview = reviews[currentIndex];
    return (
        <div className='ReviewsContent'>
            <h2>{currentReview.title}</h2>
            <p>{currentReview.content}</p>
        </div>
    );
}

function MovieRating({ reviews, currentIndex }) {
    if (!reviews || reviews.length === 0) {
        return <div>No reviews available.</div>;
    }

    const currentReview = reviews[currentIndex];
    const stars = [];

    for (let i = 0; i < currentReview.review; i++) {
        stars.push(<img key={i} src={require('../resources/star.png')} className='stars' />);
    }

    return <div>{stars}</div>;
}

function AvgScore({ averageScore }) {
    return (
        <div className="AvgScore">
            <h2>Average score: {averageScore.toFixed(2)}</h2>
        </div>
    );
}

function InfoFooter({ movieData, reviews, currentIndex, handleNextReview, handlePrevReview, handleSortingChange, sortingOption }) {
    const { movieId } = useParams();
    const [content, setContent] = useState('');
    const [review, setReview] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'content') {
            setContent(value);
        } else if (name === 'review') {
            setReview(value);
        }
    };

    return (
        <div className="InfoFooter">
            <div className="MovieDetail">
                <div className="MovieInformation">
                    <div className="MovieDetailContent">
                        <Movie movieData={movieData} />
                        <Genres movieData={movieData} />
                        <PG movieData={movieData} />
                        <ReleaseDate movieData={movieData} />
                        </div>
                    <Thumbnail movieData={movieData} />
                </div>
                <Description movieData={movieData} />
            </div>
            {window.location.pathname.slice(0, 3) === "/mo" ?
                <>
                    <div className="Review">
                        <ReviewsHeader />
                        <ReviewsTitle movieData={movieData} />
                        <MovieRating reviews={reviews} currentIndex={currentIndex} />
                            <select className='sortingContainer' id="sortingOption" value={sortingOption} onChange={handleSortingChange}>
                                <option value="rating">Rating</option>
                                <option value="date">Date</option>
                            </select>
                        <ReviewContent reviews={reviews} currentIndex={currentIndex} />
                        <div className="buttonContainer">
                            {reviews.length > 0 && (
                                <>
                                    <button className='rating-button' onClick={handlePrevReview}>Previous Review</button>
                                    <button className='rating-button' onClick={handleNextReview}>Next</button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='AddReview'>
                        <AddReviewsHeader />
                        <AddReviewRating review={review} handleChange={handleChange} />
                        <AddReviewContent content={content} handleChange={handleChange} />
                        <AddReview movieId={movieId} content={content} review={review} />
                    </div>
                </>
                : <></>
            }
        </div>
    );
}


function AddFavorite({ movieId }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/checkFavorites?user_id=${userID}&movie_id=${movieId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.ok) {
                    const isMovieFavorite = await response.json();
                    isFavoriteVar = isMovieFavorite.isFavorite;
                    console.log(isFavoriteVar);
                } else {
                    console.error('Failed to check if the movie is a favorite:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error checking if the movie is a favorite:', error);
            } finally {
                setLoading(false);
            }
        };

        checkIfFavorite();
    }, [movieId]);

    const handleToggleFavorite = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/checkFavorites?user_id=${userID}&movie_id=${movieId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                const { isFavorite } = await response.json();
                if (isFavorite === true) {
                    const deleteResponse = await fetch(
                        `http://localhost:3001/deleteFavorite?user_id=${userID}&movie_id=${movieId}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (deleteResponse.ok) {
                        console.log('Removed from favorites successfully');
                        alert('Removed from favorites successfully');
                        isFavoriteVar = false;
                    } else {
                        console.error('Failed to remove from favorites:', deleteResponse.status, deleteResponse.statusText);
                        alert('Failed to remove from favorites. Please try again.');
                    }
                } else {
                    const addResponse = await fetch('http://localhost:3001/addFavorite', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            movie_id: movieId,
                            user_id: userID,
                        }),
                    });

                    if (addResponse.ok) {
                        console.log('Added to favorites successfully');
                        alert('Added to favorites successfully');
                        isFavoriteVar = true;
                    } else {
                        console.error('Failed to add to favorites:', addResponse.status, addResponse.statusText);
                        alert('Failed to add to favorites. Please try again.');
                    }
                }
            } else {
                console.error('Failed to check if the movie is a favorite:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error checking if the movie is a favorite:', error);
        } finally {
            window.location.reload();
        }
    };

    console.log('isFavorite:', isFavoriteVar);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (isFavoriteVar === true) {
        return (
            <button className={`AddFavoriteButton`} onClick={handleToggleFavorite}>
                Remove from Favorites
            </button>
        );
    } else if (isFavoriteVar === false) {
        return (
            <button className={`AddFavoriteButton`} onClick={handleToggleFavorite}>
                Add to Favorites
            </button>
        );
    } else {
        return <p>Not found</p>;
    }
}



function AddReview({ movieId, content, review }) {
    const handleSubmit = async () => {
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            const response = await fetch('http://localhost:3001/addReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: content,
                    review: review,
                    date: formattedDate,
                    iduser: userID,
                    idmovie: movieId,
                }),
            });

            if (response.ok) {
                console.log('Review submitted successfully');
                alert("Review added successfully");
                window.location.reload();
            } else {
                console.error('Failed to submit review');
                alert("Failed to submit review. Please login");
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <button className={`SubmitReviewButton`} onClick={handleSubmit}>Submit review</button>
    );
}

function AddReviewContent({ content, handleChange }) {
    return (
        <div className="AddReviewContent">
            <textarea className='ReviewContent'
                name="content"
                value={content}
                onChange={handleChange}
                placeholder="Write your review here..."
                rows="10"
                cols="115"
            />
        </div>
    );
}

function AddReviewRating({ handleChange }) {
    const [activeRating, setActiveRating] = useState(null);

    const handleRatingClick = (value) => {
        handleChange({ target: { name: 'review', value } });
        setActiveRating(value);
    };

    return (
        <div className="AddReviewRating">
            <h4>Rating:</h4>
            {[1, 2, 3, 4, 5].map((value) => (
                <button
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    className={`rating-button ${activeRating === value ? 'active' : ''}`}
                >
                    {value}
                </button>
            ))}
        </div>
    );
}
 
function Movie({ movieData }) {
    return (
        <div className="Movie">
            <h2>{movieData.title}</h2>
        </div>
    );
}

function Genres({ movieData }) {
    const genreIds = movieData.genreid;

    if (Array.isArray(genreIds) && genreIds.length > 0) {
        const genreNames = genreIds.map((genre) => genre.name);

        return (
            <div className="Movie">
                <h5>{genreNames.join(', ')}</h5>
            </div>
        );
    } else {
        return (
            <div className="Movie">
                <h5>Unknown Genre</h5>
            </div>
        );
    }
}

function PG({ movieData }) {
    return (
        <div className="Movie">
            {movieData.PG === true ? <h5>Adults: Yes</h5> : <h5>Adults: No</h5>}
        </div>
    );
}

function ReleaseDate({ movieData }) {
    return (
        <div className="Movie">
            <h5>{movieData.ReleaseDate}</h5>
        </div>
    );
}

function Thumbnail({ movieData }) {
    let MovieURL = "https://image.tmdb.org/t/p/w500/" + movieData.posterpath;
    return (
        <div className="ThumbnailContainer">
            <div className="img">
                <img src={MovieURL} alt="Poster not found" className="thumbnail-image" />
            </div>
        </div>
    );
}

function Description({ movieData }) {
    return (
        <div className="Description">
            <h6>{movieData.overview}</h6>
        </div>
    );
}

function ReviewsHeader() {
    return (
        <div className="ReviewsHeader">
            <h2 className="ReviewHeaderText">Reviews</h2>
        </div>
    );
}

function ReviewsTitle({ movieData }) {
    return (
        <div className="ReviewsTitle">
            <h2>{movieData.title}</h2>
        </div>
    );
}

function AddReviewsHeader() {
    return (
        <div className="AddReviewsHeader">
            <h2>Add Reviews</h2>
        </div>
    );
}

export default Moviepage;