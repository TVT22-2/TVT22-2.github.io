
import placeholder from '../resources/placeholderimage.jpg';
import React, { useEffect, useState } from "react";
import { MovieDBRegData, TopratedMovies, RecentMovies } from '../components/DataLoader';
import "./Browser.css"
function Browser() {
const [isLoading, setLoading] = useState(true);
const [index, setIndex] = useState(1);
    useEffect(() => {
        if(RecentMovies.length<=1){
            MovieDBRegData("toprated");
            MovieDBRegData("recent");
        } else {
        setLoading(false);
    }
    setTimeout(function() {
        setLoading(false)
       }, 1000);
    }, []);
 if(!isLoading){
    return (
        <>
            <div className='flexcontainer'>
                <BrowserElement header="TopRated" />
                <BrowserElement header="Popular" />
                <BrowserElement header="Worst Rated" />
            </div>
        </>
    );
    }else {
        return (
            <>
            </>
        );
    }
    function BrowserElement(props) {
        return <><div className="elementcontainer">
            <div className="HeaderContainer">
                <h>{props.header}</h>
            </div>
            <MovieContainer var = {props.header}/>
        </div>
            <div className='buttoncontainer'><button className="buttonleft" onClick={()=>RecentMovies.length-20 > index ? setIndex(index+5) + console.log(RecentMovies.length + " / " + index ) : alert("hey!")}><div className="buttonlefttext">ADD</div></button>
            <button className="buttonright" onClick={()=>RecentMovies.length-20 > index ? setIndex(index-5) : alert("hey!")}><div className="buttonrighttext">REDUCE</div></button></div></>
    }
    function MovieContainer(props) {
        let row = [];
        let array = [];
        if(props.var === "TopRated"){
        array = TopratedMovies
        } else {
        array = RecentMovies;
        }
        for (let i = index; i <= index+4; i++) {
            let url = "https://image.tmdb.org/t/p/w500/" + array[i].posterpath;
            row.push(
                <div className="Moviecontainer">
                    <img src={url} className="placeholderimage" alt="Hello">
                    </img>
                    <div className='infocontainer'>
                        <p className='BrowserInfo'>{array[i].title}</p>
                        <p className='BrowserInfo'>{array[i].genreid}</p>
                        <p className='BrowserInfo'>{array[i].popularity}</p>
                    </div>
                </div>
                )
        }
        return row;
    }
}
export default Browser;