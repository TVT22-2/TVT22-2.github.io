import React, { useState, useEffect } from 'react';
import { BearerToken, userID } from '../components/react-signals.js';
import { useParams } from 'react-router-dom';
import placeholdergif from '../resources/Loading.gif';
import "./moviepage.css"
import "../components/genreids.json"
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
    if(movieData.title != undefined){
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

    useEffect(() => {
        async function fetchData() {
            const [movie, fetchedReviews] = await Promise.all([
                GetMovieData(movieId),
                GetReviews(movieId),
            ]);

            setMovieData(movie);
            setReviews(fetchedReviews);
            
            const totalScore = fetchedReviews.reduce((acc, review) => acc + review.review, 0);
            const avgScore = fetchedReviews.length > 0 ? totalScore / fetchedReviews.length : 0;
            setAverageScore(avgScore);

            setLoading(false);
        }

        fetchData();
    }, [movieId]);


    if (isLoading) {
        return <img src={placeholdergif} alt="gif" />;
    } else {
        return (
            <div className="Moviepage">
                <AvgScore averageScore={averageScore} />
                <InfoFooter movieData={movieData} reviews={reviews} currentIndex={currentIndex} handleNextReview={handleNextReview} handlePrevReview={handlePrevReview} />
                <AddFavorite movieId={movieId} />
            </div>
        );
    }
}

function ReviewContent({ reviews, currentIndex }) {
    if (!reviews || reviews.length === 0) {
        return <div>No reviews available.</div>;
    }

    const currentReview = reviews[currentIndex];
    return (
        <div className="ReviewContent">
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
    return (
        <div className="ReviewsTitle">
            <h4>{currentReview.review} / 5</h4>
        </div>
    );
}

function AvgScore({ averageScore }) {
    return (
        <div className="AvgScore">
            <h2>Average score: {averageScore.toFixed(2)}</h2>
        </div>
    );
}

function InfoFooter({ movieData, reviews, currentIndex, handleNextReview, handlePrevReview }) {
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
                <div className="buttonContainer">
                    <button onClick={handlePrevReview}>Previous Review</button>
                    <button onClick={handleNextReview}>Next</button>
                </div>
                <ReviewContent reviews={reviews} currentIndex={currentIndex} />
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

function AddFavorite({movieId}){
    const handleSubmit = async () => {
        console.log(userID);
        try{
            const response = await fetch('http://localhost:3001/addFavorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movie_id: movieId,
                    user_id: userID
            }),
        });
        if (response.ok) {
            console.log('Favorite added successfully');
        } else {
            console.error('Failed to add favorite');
        }
    } catch (error) {
        console.error('Error adding favorite:', error);
    }
    }
    return (
        <button onClick={handleSubmit}>Add Favorite</button>
    );
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
            } else {
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <button onClick={handleSubmit}>Submit review</button>
    );
}

function AddReviewContent({ content, handleChange }) {
    return (
        <div className="AddReviewContent">
            <label htmlFor="content">Review Content: </label>
            <textarea
                name="content"
                value={content}
                onChange={handleChange}
                placeholder="Write your review here..."
                rows="4"
                cols="50"
            />
        </div>
    );
}

function AddReviewRating({ review, handleChange }) {
    return (
        <div className="AddReviewRating">
            <label htmlFor="review">Select Rating: </label>
            <select name="review" value={review} onChange={handleChange}>
                <option value={0}>Select...</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
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
            <h2>Reviews</h2>
        </div>
    );
}

function ReviewsTitle({ movieData }) {
    return (
        <div className="ReviewsTitle">
            <h4>{movieData.title}</h4>
        </div>
    );
}

function AddReviewsHeader() {
    return (
        <div className="AddReviewsHeader">
            <h4>Add Reviews</h4>
        </div>
    );
}

export default Moviepage;