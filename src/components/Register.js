import "./login.css"
import axios from "axios";
import { token } from "./react-signals"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import infopng from "../resources/info-xxl.png"
export default function Login() {
   
    const [password, setPassword] = useState("");
    const [recovery, setRecovery] = useState("");
    const [username, setUsername] = useState("");
    const [alertmes, setAlert] = useState("");
    const navigate = useNavigate();
    const [hover, setHover] = useState(false); 
return(
<>
    <div className="inputcontainer">
    <h className="registerheader">Username</h>
    <input className="Username" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value.replace(/[^\w\s]/gi, '').replace(/\s/g, ''))}></input>
    <h className="registerheader">Password</h>
    <input className="Password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value.replace(/[^\w\s]/gi, '').replace(/\s/g, ''))}></input>
    <div><h className="registerheader">Password recoverykey</h><img src={infopng} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} alt="hover for info" className="infopng"></img></div>
    {hover ? <p className="notification">Password recoverykey is a word that's used for recovering your password</p> : <></>}
    <input className="Password" type="password" placeholder="Recoverykey" value={recovery} onChange={e => setRecovery(e.target.value.replace(/[^\w\s]/gi, '').replace(/\s/g, ''))}></input>
</div> {alertmes.length > 3 ? <div className="alert">{alertmes}</div> : <></>}
        <div className="RegisterContainer"><button className="Register" onClick={register}>Register</button></div>
</>
);
async function register(){
    if (password !== "" && username !== "" && recovery !== "") {
        const response = await axios.postForm('/register', { username, password, recovery })
             .catch(error => setAlert(error.response.data.error + ". Please try again later!") + setTimeout(function() {
                setAlert("")
               }, 6000))
        if(response){
        alert("Thank you! Please log in")
        navigate("/");
        } 
     } else {
         alert("Check the input fields!")
     }
}
}
