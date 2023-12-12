import "./login.css"
import axios from "axios";
import { token } from "./react-signals"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import infopng from "../resources/info-xxl.png"
export default function Login() {
    let username, password, recovery
    const navigate = useNavigate();
    const [hover, setHover] = useState(false); 
return(
<>
    <div className="inputcontainer">
    <h className="registerheader">Username</h>
    <input className="Username" type="text" placeholder="Username"  onChange={e => username = e.target.value}></input>
    <h className="registerheader">Password</h>
    <input className="Password" type="password" placeholder="Password" onChange={e => password = e.target.value}></input>
    <div><h className="registerheader">Password recoverykey</h><img src={infopng} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} alt="hover for info" className="infopng"></img></div>
    {hover ? <p className="notification">Password recoverykey is a word that's used for recovering your password</p> : <></>}
    <input className="Password" type="password" placeholder="Recoverykey" onChange={e => recovery = e.target.value}></input>
</div>
        <div className="RegisterContainer"><button className="Register" onClick={register}>Register</button></div>
</>
);
async function register(){
    if (password !== "" && username !== "" && recovery !== "") {
        await axios.postForm('/register', { username, password, recovery })
             .then(alert("Thank you! You will be redirected to the mainpage! Please log in!"))
             .then(navigate("/"))
             .catch(error => alert(error.message + ". Please try again later!"))
     } else {
         alert("Check the input fields!")
     }
}
}
