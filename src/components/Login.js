import "./login.css"
import { useState } from 'react';
import { token } from "./react-signals"
import axios from "axios";

export default function Login() {
    const [password, setPass] = useState("");
    const [username, setUser] = useState("");
    return <>
        <div className="inputcontainer"><input className="Username" type="text" placeholder="Username" onChange={e => setUser(e.target.value)}></input>
            <input className="Password" type="password" placeholder="Password" onChange={e => setPass(e.target.value)}></input></div>
        <div className="ButtonContainer"><div className="Align"><button className="LoginB" id="LoginButton" onClick={returnvalues} onKeyDown={returnvalues}>Login</button><button className="LoginB" id="LoginReset">Forgot Password?</button></div></div>
    </>
    async function returnvalues() {
        if(password !== "" && username !== ""){
        axios.postForm('login/login', { username, password })
            .then(resp => token.value = resp.data.jwtToken)
            .catch(error => console.log(error.message))
        } else {
            alert("Check the input fields!")
        }
    }
}
