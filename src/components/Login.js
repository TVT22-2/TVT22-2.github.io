
import "./login.css"
import { useNavigate } from "react-router-dom";
import { token } from "./react-signals"
import axios from "axios";
import { useState } from "react";
let password;
let username;
export default function Login() {
    const [alertmes, setAlert] = useState(""); 
    const navigate = useNavigate();
    return (
        <div>
         {token.value.length > 0 ? <><h2>Are you sure?</h2> <button onClick={()=>token.value = undefined + console.log(token.value) + navigate("/")}>yes</button><button onClick={()=>navigate("/")}>no</button></> : 
         <>
            <div className="inputcontainer">
                <input className="Username" type="text" placeholder="Username" onChange={e => username = e.target.value}></input>
                <input className="Password" type="password" placeholder="Password" onChange={e => password = e.target.value}></input>
            </div>
            <div className="ButtonContainer">
                <div className="Align">
                    <button className="LoginB" id="LoginButton" onClick={returnvalues} onKeyDown={returnvalues}>Login</button>
                    <button className="LoginB" id="LoginReset">Forgot Password?</button>
                </div>
            </div>
            {alertmes.length>1 ?  <div className="alert">{alertmes}</div> : <></>}
        </>
         }
        </div>
    )
    async function returnvalues() {
        if (password !== "" && username !== "") {
           await axios.postForm('login/login', { username, password })
                .then(resp => token.value = resp.data.jwtToken)
                .catch(error => setAlert(error.message + ". Please try again later!"))
        } else {
            alert("Check the input fields!")
        }
        if(token.value.length !==0){
            navigate("/")
        }
    }
    
}
