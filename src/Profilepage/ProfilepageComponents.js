import image from "../resources/postsplaceholder.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profilepage.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { userID } from "../components/react-signals";

function Image() {
    return (
        <div className="Image">
            <img src={image} alt="placeholder" className="placeholderImage" />
        </div>
    )
}

function Timestamp({ date }) {
    const dateObject = new Date(date);

    // Checking if parsed date is valid
    if (isNaN(dateObject.getTime())) {
        return <div className="Timestamp">Invalid Date</div>;
    }

    // Formatting date to dd/mm/yyyy
    const formattedDate = dateObject.toLocaleDateString('en-GB');

    return (
        <div className="Timestamp">
            <h2>{formattedDate}</h2>
        </div>
    );
}

function AddNewsToProfileButtonAndLink({ ButtonText, article, userIdUrl, fetchPosts }) {
    const initialDetails = {
        title: "",
        posttext: "",
        date: article.date,
        end_user_id: userID
    };

    const [details, setDetails] = useState(initialDetails);
    const [error, setError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedDetails = {
            ...initialDetails,
            title: article.title,
            posttext: `${article.content} ${article.link}`,
            date: article.date,
        };

        if (userID.value != userIdUrl) {
            setError("You cannot add news to another user's profile.");
            return;
        } else if (userID === "" || userID === null || userID === undefined) {
            setError("You must be logged in to add news.");
            return;
        } else {
            // Use the updated state in the fetch request
            fetch('http://localhost:3001/post/insertPostUser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedDetails) // Use the updated details

            }).then(() => {
                setDetails(initialDetails);
                fetchPosts();
            })
                .catch((error) => {
                    console.error("Error adding news:", error);
                });
        }
    }

    return (
        <div className="ButtonAndLinkNewsfeed">
            <a href={article.link}>Read More</a>
            {error && <div className="ErrorMessage">{error}</div>}
            <button id="Button" onClick={submitHandler}>
                {ButtonText}
            </button>
        </div>
    );
}

function DeleteReviewButton({ reviewID, fetchReviews }) {

    const navigate = useNavigate();

    async function deleteReview() {
        let userid = userID.value;
        let reviewid = reviewID
        const confirmation = window.confirm("Delete review?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3001/deleteReview`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userid, reviewid })
            });
            fetchReviews();
            navigate(`/Profile/${userid}`);
            if (response) {
            }
        } else {
            alert("Cancelled")
        }
    }

    return (
        <div className="DeleteReviewButton">
            <button id="DeleteReviewButton" onClick={deleteReview}>
                Delete</button>
        </div>
    );
}

function DeletePostButton({ postID, fetchPosts }) {

    const navigate = useNavigate();

    async function deletePost() {
        let userid = userID.value;
        let postid = postID
        const confirmation = window.confirm("Delete post?");
        if (confirmation) {
            const response = await fetch(`http://localhost:3001/deletePost`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userid, postid })
            });
            fetchPosts();
            navigate(`/Profile/${userid}`);
            if (response) {
            }
        } else {
            alert("Cancelled")
        }
    }

    return (
        <div className="DeletePostButton">
            <button id="DeletePostButton" onClick={deletePost}>
                Delete</button>
        </div>
    );
}

function ButtonOpenEditPost({ ButtonOpenEditPost, onButtonOpenEditPostClick }) {

    return (
        <>
            <button id="ButtonOpenEditPost" onClick={onButtonOpenEditPostClick}>
                {ButtonOpenEditPost}</button>
        </>
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

function ButtonsPostsAndNewsfeed({ ButtonLeft, ButtonRight, ButtonMiddle,
    onButtonLeftClick, onButtonRightClick, onButtonMiddleClick }) {
    return (
        <div className="Buttons">
            <button id="ButtonLeft" onClick={onButtonLeftClick}>
                {ButtonLeft}</button>
            <button id="ButtonMiddle" onClick={onButtonMiddleClick}>
                {ButtonMiddle}</button>
            <button id="ButtonRight" onClick={onButtonRightClick}>
                {ButtonRight}</button>
        </div>
    );
}

function ButtonsGroups({ ButtonLeft, ButtonRight, ButtonMiddle,
    onButtonLeftClick, onButtonRightClick, onButtonMiddleClick, onCopy }) {
    const [copied, setCopied] = useState(false);
    const value = window.location.href;
    const handleCopy = () => {
        setCopied(true);
        if (onCopy) {
            onCopy(); // Invoke the callback function if provided
        }
    };

    return (
        <div className="Buttons">
            <button id="ButtonLeft" onClick={onButtonLeftClick}>
                {ButtonLeft}</button>
            <CopyToClipboard text={value} onCopy={handleCopy}>
                <button id="ButtonMiddle" onClick={onButtonMiddleClick}>
                    {ButtonMiddle}</button>
            </CopyToClipboard>
            {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
            <button id="ButtonRight" onClick={onButtonRightClick}>
                {ButtonRight}</button>
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

export { Image, Timestamp, AddNewsToProfileButtonAndLink, DeleteReviewButton, DeletePostButton, ButtonOpenEditPost, Buttons, ButtonsPostsAndNewsfeed, ProfileGroupName, ProfileMovieTitle, Rating, Text, ButtonsGroups };
