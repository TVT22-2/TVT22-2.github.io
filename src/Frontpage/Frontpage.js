
import React, { useEffect, useState } from "react";
import { userID } from "../components/react-signals";
import axios from "axios";
import "./frontpage.css" 
import { MovieDBRegData,ReviewGetter, UpcomingMovies, TrendingMovies, RecentMovies, ReviewArray  } from'../components/DataLoader';
import { Link } from "react-router-dom";
import ScrollContainer from 'react-indiana-drag-scroll'
let NewsArray = [];
let GroupArray = [];
let Groupselection = "";
export default function Frontpage() {
    const [isLoading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchdata = async () => {
            parsegroups();
            window.scrollTo(0, 0)
            await ReviewGetter();   
            await MovieDBRegData("trend", 1,1)
            .then(()=> newsbutton())
             .then(()=> MovieDBRegData("upcom", 1,1))
             .then(()=> MovieDBRegData("recent", 1,1))
             .then(()=> setLoading(false))
        }
        fetchdata();
    }, []);
    if (isLoading) {
    return (
     <> 
     </>
    );
    }
    return (
        <>
        <MovieElementHead/>
        <HeaderElement text="Trending"/>
        <MovieBrowser text="trend"/>
        <HeaderElement text="Upcoming"/>
        <MovieBrowser text="upcom"/>
        <HeaderElement text="Recent Reviews"/>
        <nav className="navBar" id="frontpagereviews">
            <div className="container">
            <ScrollContainer className="nav">
                <Reviews/>
        </ScrollContainer>
        </div>
        </nav>
        <HeaderElement text="Recent Movie News"/>
        <News/>
        <br></br>
        <br></br>
        <br></br>
    </>
    );
    } 
    function fetchgroups(){
        let fetchresponse = fetch(`http://localhost:3001/Groups/${userID.value}`)
        .then(response => fetchresponse = response.json())
        return fetchresponse;
    }
    async function parsegroups(){
      let data = await fetchgroups();
      GroupArray = []; 
      data.forEach( element => {
      let array = {
        id: element.id,
        name: element.name
      }
      GroupArray.push(array)
      })
    }
    function News(){
        let NewsRow = [];
        for(let i = 1; i<11; i++){
        if(NewsArray[i]!==undefined){
            let url = NewsArray[i].imgurl;
            var date = new Date(NewsArray[i].date);
        NewsRow.push(
            <li className="movienewscontainer">
            <div className="NewsImageContainer">
            <Link to={NewsArray[i].link}>
            <img src={url} alt="bigdogstatus" className="recentNewsImage"></img>
            </Link>
            </div>
            <article className="movienewsinfo">
                <div className="MovieNewsDate" id="MovieNewsTitle">{NewsArray[i].title}</div>
                <div className="MovieNewsDate" id="MovieNewsDate">{date.toUTCString()}</div>
                {userID.value ?  
                <>
                <div className="MovieNewsDate" id="MovieNewsDate"><button className="MovieNewsButton" onClick={()=>profilesender(i)}>Add to profile</button></div>
               {GroupArray.length>0 ? <div className="GrouselectionContainer"><GroupSelectRender/><button className="GroupSubmitButton" onClick={()=>GroupPagePost(NewsArray[i].title,NewsArray[i].date,NewsArray[i].content+NewsArray[i].link)}>Send to selected group</button></div> : <></>}
                </>
         : <></>}
                <div className="MovieNewsPr"><p>{NewsArray[i].content}</p></div>
            </article>
        </li> 
         );
        } else {
            NewsRow.push(<>Error with database connection</>)
            break;
        }
        }
    return NewsRow;
        
    }
    function GroupPagePost(title,date,content){
        let datestring = new Date(date).toISOString();
        date = datestring;
        const updatedDetails = {
            title: title,
            posttext: content,
            date: date,
            group_id: Groupselection
        }
     fetch("http://localhost:3001/post/insertPostGroup",{
        method: 'POST',
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify(updatedDetails)
     });
    alert("Post Has been sent!");
    }
    function GroupSelectRender(){
        let rows = []; 
        GroupArray.forEach(data => {
            rows.push(
                <option className="optionValue" value={data.id}>{data.name}</option>
            )
        })
    return (
     <select classname="GroupSelection" onChange={(e)=>Groupselection = e.target.value}>
        <option className="optionValue" value=""></option>
        {rows}
     </select>
    );
    }
    function profilesender(i){
    var dateString = new Date(NewsArray[i].date);
    const updatedDetails = {
        title: NewsArray[i].title,
        posttext: `${NewsArray[i].content} ${NewsArray[i].link}`, 
        date: dateString.toISOString(),
        end_user_id: userID.value
    }
    fetch('http://localhost:3001/post/insertPostUser', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails)

    }).then(alert("post has been added to the your profile!"))
    }
    async function newsbutton(){
        let url = "https://www.finnkino.fi/xml/News/";
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/xml; charset=utf-8",
            },
        });
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const articles = xmlDoc.querySelectorAll("NewsArticle");
        const extractedNews = Array.from(articles).map((article) => ({
            title: article.querySelector("Title").textContent,
            date: article.querySelector("PublishDate").textContent,
            content: article.querySelector("HTMLLead").textContent,
            link: article.querySelector("ArticleURL").textContent,
            imgurl: article.querySelector("ImageURL").textContent
        }));
        NewsArray = extractedNews;
    }
    function Reviews(){
        let reviews = [];
        for(let i = 1; i<=5; i++){
        if(ReviewArray[i]!==undefined){
         reviews.push(
        <div className="FrontpageReviewContainer">
        <Link to={"http://localhost:3000/movie/" + ReviewArray[i].id}>
        <div className="verticaltextTitle">{ReviewArray[i].movietitle}</div>
        </Link>
        <div className="verticaltextScore">{ReviewArray[i].review}/5</div>
        <div className="verticaltextReview">{ReviewArray[i].content}</div>
        </div>
         );
        } else {
            reviews.push(<>Error with database connection</>)
            break;
        }
        }
    return reviews;
        
    }
    function MovieElementHead() {
        let [index, setIndex] = useState(1);
        setTimeout(function() {
            if(index<10){
               setIndex(++index);
            } else {
                setIndex(1);    
            }
        }, 8000);
        if(RecentMovies[index]!==undefined){
        let url = "https://image.tmdb.org/t/p/w500/" + RecentMovies[index].posterpath;
        return (
            <>
            <li className="moviecontainer">
                <Link to={"http://localhost:3000/movie/" + RecentMovies[index].id}>
                <img src={url} alt="bigdogstatus" className="recentImage"></img>
                </Link>
                <article className="movieinfo">
                    <div className="title">{RecentMovies[index].title}</div>
                    <div className="title">{RecentMovies[index].genreid}</div>
                    <div className="title">{"Score: "+ RecentMovies[index].popularity}</div>
                </article>
            </li> 
            </>
        );
        } else {
            return <>Error with database connection</>
        }
    }
    function MovieElementVertical(props) {
        let imageurl = "https://image.tmdb.org/t/p/w500/"+ props.imagepath;
        let rows  = []; 
        props.genre.forEach(element => {
            rows.push(<div className="frontpagegenrecontaienr">{element}</div>);
        });
        return (
        <div className="verticalcontainer">
        <div className="ImageContainer">
        <Link to={"http://localhost:3000/"+props.movie+"/" + props.id}>
        <img src={imageurl} alt="bigdogstatus" className="elementimage"/>
        </Link>
        </div>
        <div className="verticaltext">{props.title}</div>
        <div className="verticaltext">{rows}</div>
        <div className="verticaltext" id="FrontScore">Score: {props.popularity}</div>
        </div>
        );  
    }
    function HeaderElement(props) {
        return (
            <div className="headingelement">
            <h className="Movieheading">{props.text}</h>
            </div>
        );
    }
     function MovieBrowser(props){
        if(props.text === "upcom"){
        return (
            <nav className="navBar">
            <div className="container">
            <ScrollContainer className="nav">
            <MovieElementRender var = {props.text}/>
            </ScrollContainer>
            </div>
            </nav>
            );
        }
        if(props.text === "trend"){
            return (
                <nav className="navBar">
                <div className="container">
                <ScrollContainer className="nav">
                <MovieElementRender var = {props.text}/>
                </ScrollContainer>
                </div>  
                </nav>
                );
        }
    }
  function MovieElementRender(props){
    let row = [];
    let array = [];
    if(props.var === "trend"){
    array = TrendingMovies;
    }else if(props.var === "upcom"){
    array = UpcomingMovies;
    }
   for (let i = 1; i<=20;i++){
    if(array[i]!==undefined){
    row.push(<MovieElementVertical title={array[i].title} genre={array[i].genreid} popularity={array[i].popularity} imagepath={array[i].posterpath} id={array[i].id} movie={array[i].movie}/>)
    } else {
        row.push(<>Error with the connection</>)
        break;
    }
   }
    return row;
  }


