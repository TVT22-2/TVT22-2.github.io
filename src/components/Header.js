import { useState } from "react";
import { token } from "./react-signals"
import "./home.css"
import nav from "../resources/navbuttonplaceholder.png"
import { Link } from "react-router-dom"

function Home() {
    const [section, setSection] = useState("Home")
    const [open, setOpen] = useState(false);
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
            <div></div><Searchbar />
            </div>
        </>
    );

    function Dropdownelements(props) {
    return (
        <div className="DropdownItems"><Link className="dropdowntext" to={props.href} onClick={()=>setSection(props.text)}>{props.text}</Link></div>
    );
}
}
function Searchbar() {
    function sumbit(event) {
        if (event.key === 'Enter') {
            console.log('enter was pressed with the value ' + event.target.value);
        }
    }
    return (
        <><input className="searchbar" onKeyDown={sumbit} type="text" placeholder="Search"></input></>
    );
}

export default Home;