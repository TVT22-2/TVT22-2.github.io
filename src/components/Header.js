import { useState } from "react";
import { token, BearerToken } from "./react-signals"
import "./home.css"
import noposter from "../resources/no_poster.png"
import nav from "../resources/navbuttonplaceholder.png"
import { Link, useLocation } from "react-router-dom"
import { useEffect } from "react";
import { userID } from "../components/react-signals";

let searcharray = [{
}];
let index = 5;
let totalpages;
let adult = false;
let year = "";
let curpage = 1;
let curquery = "";
let uiPage = 1;
let statevar = 1;
let multiplication = 4;
let movietv = "movie";
function Home() {
    const location = useLocation();
    useEffect(() => {
        setsearches(false)
        let header = window.location.pathname.replace(/\d+/g, "").replace("/", "").replace("/", "");
        setSection(window.location.pathname.slice(1, 10).length > 0 ? header.charAt(0).toUpperCase() + header.slice(1) : "Home")
        totalpages = "";
        curpage = 1;
    }, [location])
    const [state, setState] = useState(false);
    const [message, setMessage] = useState("");
    const [section, setSection] = useState("")
    const [open, setOpen] = useState(false);
    const [searchbaropen, setsearchbar] = useState(false);
    const [searches, setsearches] = useState(false);
    /*const userId = userID.value;*/
    useEffect(() => {
        if (searchbaropen) {
            adult = false;
            year = "";
        }
    }, [searchbaropen])
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
                        {token.value.length > 0 ?  <Dropdownelements text="Profile" href={`/Profile/${userID}`} Header="Profile" /> : 
                        <></>
                        }
                        <Dropdownelements text="Groups" href="/Groups" Header="Groups" />
                        <Dropdownelements text={`${token.value.length > 0 ? 'Logout' : 'Login'}`} href="/login" Header="Login" />
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
                <div className="DropdownelementContainer">
                    <h>Release Year</h>
                    <input className="SearchInputyear" placeholder="release year" maxLength="4" onChange={(event) => year = event.target.value.replace(/\D/g, '')}></input>
                </div>
                <div className="DropdownelementContainer">
                    <h>Adult Content</h>
                    <input type="checkbox" id="checkbox" onClick={e => adultsetter(e)} />
                </div>
                <div className="DropdownelementContainer">
                    <h>Results per page</h>
                    <select className="SearchSelect" onChange={indexsetter}>
                        <option value={5}></option>
                        <option value={20}>20</option>
                        <option value={10}>10</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div className="DropdownelementContainer">
                    <h>Movie/TV</h>
                    <select className="SearchSelect" onChange={(event) => movietv = event.target.value}>
                        <option value={"movie"}></option>
                        <option value={"movie"}>Movie</option>
                        <option value={"tv"}>TV-Show</option>
                    </select>
                </div>
            </div>
                :
                <>
                </>}
            {searches ?
                <>
                    <Result state={state} />
                    <div className="SearchButtonContainer">
                        <button onClick={() => uiPage !== 1 ? refreshminus() : <></>} className="SearchButtonPrev">prev</button>
                        {totalpages !== 1 ? <p>{uiPage + "/" + totalpages * multiplication}</p> : <p>{uiPage + "/" + totalpages}</p>}
                        <button onClick={() => curpage < totalpages ? refresh() : <></>} className="SearchButtonNext">next</button>
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
    function adultsetter(event) {
        adult = event.target.checked;
    }
    async function sumbit(e) {
        if (e.key === "Enter") {
            uiPage = 1;
            curpage = 1;
            if (!searchbaropen) {
                year = "";
                adult = false;
            }
            curquery = message;
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
        getter();
        async function getter() {
            setState(!state);
        }
    }
    function Result() {
        let row = [];
        for (let i = index * statevar - index; index * statevar > i; i++) {
            if (searcharray[i] !== undefined) {
                let url = "https://image.tmdb.org/t/p/w500" + searcharray[i].posterpath;
                if (searcharray[i].posterpath) {
                    row.push(
                        <div className="searches"><img src={url} alt="No poster found" className="thumbnail"></img><Link to={"http://localhost:3000/" + movietv + "/" + searcharray[i].id} className="SearchTitle">{searcharray[i].title}</Link></div>
                    )
                } else {
                    row.push(
                        <div className="searches"><img src={noposter} alt="No poster found" className="thumbnail"></img><Link to={"http://localhost:3000/" + movietv + "/" + searcharray[i].id} className="SearchTitle">{searcharray[i].title}</Link></div>
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
        if (movietv === "tv") {
            for (let i = 0; i < data.results.length; i++) {
                let array = {
                    title: data.results[i].name,
                    id: data.results[i].id,
                    posterpath: data.results[i].poster_path
                }
                searcharray.push(array);
            }
        } else {
            for (let i = 0; i < data.results.length; i++) {
                let array = {
                    title: data.results[i].title,
                    id: data.results[i].id,
                    posterpath: data.results[i].poster_path
                }
                searcharray.push(array);
            }
        }
    }
    function datagetter() {
        let fetchresponse;
        let url;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + BearerToken
            }
        };
        url = 'https://api.themoviedb.org/3/search/' + movietv + '?query=' + curquery + '&include_adult=' + adult + '&language=en-US&page=' + curpage + '&year=' + year;
        fetchresponse = fetch(url, options)
            .then(response => fetchresponse = response.json())
            .catch(err => console.error(err));
        return fetchresponse;
    }
}
export default Home;