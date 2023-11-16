import { useState } from "react";
import "./home.css"
import nav from "./resources/navbuttonplaceholder.png"
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
                        <Dropdownelements text="Login" href="/login" Header="Login" />
                        <Dropdownelements text="Profile" href="/Profile" Header="Profile" />
                    </div>
                </div>
            </header>
            <div></div><Searchbar /><div className="footer"><p>About us || Contact Us || Help</p></div>
            </div>
        </>
         /* Remember to change Profile href back to #Profile */
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