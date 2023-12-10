import image from "../resources/postsplaceholder.png";
import React, { useEffect, useState } from "react";
import "./Profilepage.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Image() {
    return (
        <div className="Image">
            <img src={image} alt="placeholder" className="placeholderImage" />
        </div>
    )
}

function Timestamp({ Date }) {
    return (
        <div className="Timestamp">
            <h2>{Date}</h2>
        </div>
    );
}

function AddNewsToProfileButton({ ButtonText, article, user }) {
    const initialDetails = {
        title: "",
        posttext: "",
        date: article.date,
        end_user_id: user
    };

    const [details, setDetails] = useState(initialDetails);

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedDetails = {
            ...initialDetails,
            title: article.title,
            posttext: `${article.content} ${article.link}`, // Using template literals for better readability
            date: article.date,
        };

        // Use the updated state in the fetch request
        fetch('http://localhost:3001/post/insertPostUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDetails) // Use the updated details

        }).then(() => {
            console.log('New newspost added');
            setDetails(initialDetails);
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error adding post:", error);
        });
    }

    return (
        <div className="Button">
            <button id="Button" onClick={submitHandler}>
                {ButtonText}
            </button>
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

function Link({ Link, Description }) {
    return (
        <div className="Link">
            <a href={Link}>{Description}</a>
        </div>
    );
}


function CopyProfileLink({ onCopy }) {
    const [copied, setCopied] = useState(false);
    const value = window.location.href;

    const handleCopy = () => {
        setCopied(true);
        if (onCopy) {
            onCopy(); // Invoke the callback function if provided
        }
    };

    return (
        <div>
            <CopyToClipboard text={value} onCopy={handleCopy}>
                <button id="ButtonCopyProfileLink">
                    Copy Profile Link
                </button>
            </CopyToClipboard>

            {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
        </div>
    );
}


export { Image, Timestamp, AddNewsToProfileButton, Buttons, ButtonsPostsAndNewsfeed, ProfileGroupName, ProfileMovieTitle, Rating, Text, CopyProfileLink, Link };
