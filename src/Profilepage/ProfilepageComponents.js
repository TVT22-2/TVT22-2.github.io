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

export { Image, Timestamp, ButtonsPostsAndNewsfeed, Buttons, ProfileGroupName, ProfileMovieTitle, Rating, Text, CopyProfileLink };
