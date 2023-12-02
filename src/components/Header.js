import { useState } from "react";
import { token,BearerToken } from "./react-signals"
import "./home.css"
import noposter from "../resources/no_poster.png"
import nav from "../resources/navbuttonplaceholder.png"
import { Link, useLocation } from "react-router-dom"
import customData from '../components/genreids.json';
import { useEffect } from "react";
let searcharray = [{
}];
let index = 20;
let totalpages;
let adult = false;
let year = "";
let curpage = 1;
let uiPage = 1;
let statevar = 1;
let multiplication = 1;
function Home() {
    const location = useLocation();
    useEffect(() => {
        setsearches(false)
        totalpages = "";
        curpage = 1;
    }, [location])
    const [state, setState] = useState(false);
    const [message, setMessage] = useState("");
    const [section, setSection] = useState("Home")
    const [open, setOpen] = useState(false);
    const [searchbaropen, setsearchbar] = useState(false);
    const [searches, setsearches] = useState(false);
    let genre = "";
    return (
        <><div className="Flex-container">
            <header className="webheader">
                <Link className="name" to="/">IET</Link>
                <div className="section">{section}</div>
                <div className="dropdown" onClick={() => setOpen(!open)} >
                    <img src={nav} alt="navigation button" className="navimg"></img>
                    <div className={`dropdownmenu ${open ? 'active' : 'inactive'}`}>
                        <Dropdownelements text="Home" href="/" Header="Login" />
                        <Dropdownelements text="Browse" href="/Browse" Header="Browse" />
                        <Dropdownelements text="Profile" href="/Profile" Header="Profile" />
                        <Dropdownelements text="Groups" href="/Groups" Header="Groups" />
                        <Dropdownelements text={`${token.value.length > 0 ? 'Logout' : 'Login'}`} href="/login" Header="Login"/>
                        {token.value.length > 0 ? <></> : 
                        <Dropdownelements text="Register" href="/Register" Header="Register" />
                        }
                    </div>
                </div>
            </header>
            <div></div>
            <div className="SearchFlexContainer"><input className="searchbar" onKeyDown={sumbit} onChange={(event) => setMessage(event.target.value)} type="text" placeholder="Search"></input>
                <div className="SearchbarDropdown">
                    <img src={nav} alt="searchdropdown" onClick={() => setsearchbar(!searchbaropen)} className="searchdropdown"></img>
                </div>
            </div>
            {searchbaropen ? <div className={`searchoption ${searchbaropen ? 'active' : 'inactive'}`}>
                <input placeholder="release year" maxLength="4" onChange={(event) => year = event.target.value}></input>
                <lable>
                    <input type="checkbox" onClick={adultsetter} />
                    adult
                </lable>
                <select onChange={indexsetter}>
                    <option value={20}>20</option>
                    <option value={10}>10</option>
                    <option value={5}>5</option>
                </select>
            </div>
                :
                <>
                </>}
            {searches ?
                <>
                    <Result state={state} />
                    <div className="SearchButtonContainer">
                        <button onClick={() => curpage < totalpages ? refresh() : console.log("hello")} className="SearchButtonNext">next</button>
                        <p>{uiPage + "/" + totalpages * multiplication}</p>
                        <button onClick={() => uiPage !== 1 ? refreshminus() : console.log("hello")} className="SearchButtonPrev">prev</button>
                    </div>
                </>
                :
                <>
                </>
            }
        </div>
        </>
    );
    function indexsetter(event) {
        index = event.target.value;
        multiplication = 20 / index;
    }
    function Dropdownelements(props) {
        return (
            <div className="DropdownItems"><Link className="dropdowntext" to={props.href} onClick={() => setSection(props.text)}>{props.text}</Link></div>
        );
    }
    function adultsetter() {
        if (adult) {
            adult = false;
        } else {
            adult = true;
        }
    }
    async function sumbit(event) {
        uiPage = 1;
        curpage = 1;
        if(!searchbaropen){ 
        year="";
        } 
        if (event.key === 'Enter') {
            setsearches(false);
            if (message.length > 0) {
                await datasetter();
                setsearchbar(false);
                setsearches(true);
            } else {
                alert("The search needs an input!")
            }
        }
    }
    async function refreshminus() {
        uiPage--;
        if (statevar === 1) {
            statevar = multiplication;
            curpage--;
            await datasetter();
        } else {
            statevar--;
        }
        console.log("Statevar: " + statevar);
        getter();
        async function getter() {
            setState(!state);
        }
    }
    async function refresh() {
        uiPage++;
        if (multiplication <= statevar) {
            statevar = 1;
            curpage++;
            await datasetter();
        } else {
            statevar++;
        }
        console.log("Statevar: " + statevar);
        getter();
        async function getter() {
            setState(!state);
        }
    }
    function Genres() {
        let rows = [];
        rows.push(
            <option value=""></option>
        )
        for (var genre of customData.genres)
            rows.push(
                <option value={genre.id}>{genre.name}</option>
            )
        return rows;
    }
    function Result() {
        let row = [];
        for (let i = index * statevar - index; index * statevar > i; i++) {
            if (searcharray[i] !== undefined) {
                let url = "https://image.tmdb.org/t/p/w500" + searcharray[i].posterpath;
                if (searcharray[i].posterpath) {
                    row.push(
                        <div className="searches"><img src={url} alt="No poster found" className="thumbnail"></img><Link to={"http://localhost:3000/movie?" + searcharray[i].id} className="SearchTitle">{searcharray[i].title}</Link></div>
                    )
                } else {
                    row.push(
                        <div className="searches"><img src={noposter} alt="No poster found" className="thumbnail"></img><Link to={"http://localhost:3000/movie?" + searcharray[i].id} className="SearchTitle">{searcharray[i].title}</Link></div>
                    )
                }
            } else {
                row.push(<></>)
            }
        }
        return row;
    }
    async function datasetter() {
        let data = await datagetter();
        totalpages = data.total_pages;
        searcharray = [];
        for (let i = 0; i < data.results.length; i++) {
            let array = {
                title: data.results[i].title,
                id: data.results[i].id,
                posterpath: data.results[i].poster_path
            }
            searcharray.push(array);
        }
    }
    function datagetter() {
        let fetchresponse;
        let url;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer '+BearerToken
            }
        };
        url = 'https://api.themoviedb.org/3/search/movie?query=' + message + '&include_adult=' + adult + '&language=en-US&page=' + curpage + '&year=' + year;
        fetchresponse = fetch(url, options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
        return fetchresponse;
    }
}
export default Home;