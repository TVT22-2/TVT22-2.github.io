
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieDBRegData, TopratedMovies, UpcomingMovies, RecentMovies, aoptrm, aopum,aoprm } from '../components/DataLoader';
import "./Browser.css"
let curpage1 = 1;
let curpage2 = 1;
let curpage3 = 1;
let uipage1 =1;
let uipage3 =1;
let uipage2 =1;
function Browser() {
const [isLoading, setLoading] = useState(true);
const [index1, setIndex1] = useState(1);
const [index2, setIndex2] = useState(1);
const [index3, setIndex3] = useState(1);
    useEffect(() => {
        async function loader(){
            window.scrollTo(0, 0)
            await MovieDBRegData("toprated", 1,1);
            await MovieDBRegData("recent", 1,1);
            await MovieDBRegData("upcom", 1,1);
            setLoading(false)
        }
        loader();
    }, []);
 if(!isLoading){
    return (
        <>
            <div className='flexcontainer'>
                <BrowserElement header="TopRated" array={TopratedMovies} index={index1} setIndex={setIndex1} pagevar={curpage1} pages={aoptrm} uipage={uipage1}/>
                <BrowserElement header="Recent" array={RecentMovies} index={index2} setIndex={setIndex2} pagevar={curpage2} pages={aoprm} uipage={uipage2}/>
                <BrowserElement header="Upcoming" array={UpcomingMovies} index={index3} setIndex={setIndex3} pagevar={curpage3} pages={aopum} uipage={uipage3}/>
            </div>
        </>
    );
    } else {
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
            <MovieContainer var = {props.array} index={props.index}/>
        </div>
        <Button index={props.index} setIndex={props.setIndex} header={props.header} page={props.pagevar} var ={props.array} pages={props.pages} uipage={props.uipage}/>
        </>
            
    
    function MovieContainer(props) {
        let row = [];
        for (let i = props.index; i <= props.index+4; i++) {
            if(props.var[i]!==undefined){
                let rows= []
            props.var[i].genreid.forEach(element => {
                rows.push(<div className="BrowserGenreContainer">{element}</div>);
            });
            let url = "https://image.tmdb.org/t/p/w500/" + props.var[i].posterpath;
            row.push(
                <div className="Moviecontainer">
                    <Link to={"http://localhost:3000/movie/" + props.var[i].id}>
                    <img src={url} className="placeholderimage" alt="Hello"></img>
                    </Link>
                    <div className='infocontainer'>
                        <p className='BrowserInfo' id="BrowserHeaderID">{props.var[i].title}</p>
                        <p className='BrowserInfo' id="genreid">{rows}</p>
                        <p className='BrowserInfo'>Score: {props.var[i].popularity}</p>
                    </div>
                </div>
                )
            } else{
                row.push(
                    <>Connection error</>
                )
                break;
            }
        }
        return row;
    }

    async function PageFetcher(setIndex, header, dir){
        let tempvar = 1; 
        let temppage = 1; 
        if(header.toLowerCase() === "toprated"){
            if(curpage1>1 && dir === "-"){
                temppage = curpage1
                curpage1--;
                tempvar = curpage1;
            } else if( dir === "+") {
                temppage = curpage1
                curpage1++;
                tempvar = curpage1;
            }
        } else if (header.toLowerCase() === "recent") {
            if(curpage2>1 && dir === "-"){
                temppage = curpage2
                curpage2--;
                tempvar = curpage2;
            } else if( dir === "+") {
                temppage = curpage2
                curpage2++;
                tempvar = curpage2;
            }
        } else {
            if(curpage3>1 && dir === "-"){
                temppage = curpage3
                curpage3--;
                tempvar = curpage3;
            } else if( dir === "+") {
                temppage = curpage3
                curpage3++;
                tempvar = curpage3;
            }
        }  
        if(header.toLowerCase() === "toprated"){
        await MovieDBRegData("toprated", 1,tempvar);
  
        }else if (header.toLowerCase() === "upcoming") {
            await MovieDBRegData("upcom", 1,tempvar);

        } else {
            await MovieDBRegData("recent", 1,tempvar);

        }
        setTimeout(function() {
            if(dir === "-" && temppage!==1){
            setIndex(16);
            } else {
            setIndex(1);
            }
           }, 1);
    }
    function Button(props){
        return(
        <><div className='buttoncontainer'><button className="buttonleft" onClick={()=>props.var.length-1 >= props.index+5 ? props.setIndex(props.index+5) + UiPageSetter(props.header, "+")  : PageFetcher(props.setIndex, props.header, "+") + UiPageSetter(props.header, "+")}>
            <div className="buttonlefttext">Next</div>
            </button>
            <div className="uipagescontainer">
            <div className="uipagestext">{props.uipage}/{props.pages*4}</div>
            </div>
        <button className="buttonright" onClick={()=>props.index !== 1 ? props.setIndex(props.index-5) + UiPageSetter(props.header, "-")  : props.index-5 > 1 ? props.setIndex(props.index-5) + UiPageSetter(props.header, "-") : PageFetcher(props.setIndex, props.header, "-") + UiPageSetter(props.header, "-")}>
            <div className="buttonrighttext">Previous</div>
            </button>
            </div></>
        ); 
    }
    function UiPageSetter(header, dir){
        if(header.toLowerCase() === "toprated"){
            if(uipage1>1 && dir === "-"){
            uipage1--;
            } else if( dir === "+") {
            uipage1++;
            }
        } else if (header.toLowerCase() === "recent") {
            if(uipage2>1 && dir === "-"){
                uipage2--;
            } else if( dir === "+") {
                uipage2++;
            }
        } else {
            if(uipage3>1 && dir === "-"){
                uipage3--;
            } else if( dir === "+") {
                uipage3++;
            }
        }  
    }
}

    }
export default Browser;