import React, { useEffect, useState } from "react";
import image from "../resources/postsplaceholder.png";

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


export { Image, Timestamp, ButtonsPostsAndNewsfeed, Buttons, ProfileGroupName, ProfileMovieTitle, Rating, Text };
