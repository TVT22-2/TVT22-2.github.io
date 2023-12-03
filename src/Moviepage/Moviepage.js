import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import placeholdergif from '../resources/Loading.gif';
import "./moviepage.css"
import "../components/genreids.json"


function Fetch(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzgzMGVlZjk2NThlYWMyNmE5YmJiYTMyMDJiYzIyMSIsInN1YiI6IjY1NDM4YmZmOWNjNjdiMDBkZjkxY2FkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YfFUMP1RQ9zgAuGJuPPFUWhcmGV-IV2NeLpJeEu4AHk',
        },
    };

    return fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        .then((response) => response.json())
        .catch((err) => console.error(err));
}

async function GetMovieData(movieId) {
    const movieData = await Fetch(movieId);
    return {
        title: movieData.title,
        genreid: movieData.genres,
        PG: movieData.adult,
        ReleaseDate: movieData.release_date,
        overview: movieData.overview,
        posterpath: movieData.poster_path,
    };
}

async function GetReviews(movieId) {
    const response = await fetch(`http://localhost:3001/getmoviereview/${movieId}`);
    const reviews = await response.json();
    return reviews;
}


function Moviepage() {
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
            {/* Add other fields you want to display */}
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
            <div className="AddReview">
                <AddReviewsHeader />
            </div>
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