
import "./login.css"
import { useNavigate } from "react-router-dom";
import { token } from "./react-signals"
import axios from "axios";
import { useState } from "react";
let stage = 1;
export default function Login() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [username, setUsername] = useState("");
    const [alertmes, setAlert] = useState("");
    const [forgot, setForgot] = useState(false);
    const [pass, setPass] = useState(false);
    const navigate = useNavigate();
    return (

        <div>
            {token.value.length > 0 && pass === false ? <><h2>Are you sure?</h2> <button onClick={() => token.value = undefined + console.log(token.value) + navigate("/")}>yes</button><button onClick={() => navigate("/")}>no</button></> :
                <>
                    <div className="inputcontainer">
                        {pass === true ? <><input className="newPass" type="text" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)}></input><input className="newPass" type="text" placeholder="New password" value={password2} onChange={e => setPassword2(e.target.value)}></input></> : <>
                            <input className="Username" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
                            {forgot !== false ? <input className="Password" type="password" placeholder="Recoverykey" value={password} onChange={e => setPassword(e.target.value)}></input> :
                                <input className="Password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                            }
                        </>
                        }
                    </div>
                    <div className="ButtonContainer">
                        <div className="Align">
                            {forgot !== false ? <button className="LoginB" id="LoginButton" onClick={recoveryfunc}>Change Password</button>
                                :
                                <button className="LoginB" id="LoginButton" onClick={returnvalues} onKeyDown={returnvalues}>Login</button>
                            }
                            <button className="LoginB" id="LoginReset" onClick={() => setForgot(!forgot) + setUsername("") + setPassword("")}>Forgot Password?</button>
                        </div>
                    </div>
                    {alertmes.length > 3 ? <div className="alert">{alertmes}</div> : <></>}
                </>
            }

        </div>
    )
    async function returnvalues() {
        if (password !== "" && username !== "") {
            await axios.postForm('login/login', { username, password })
                .then(resp => token.value = resp.data.jwtToken)
                .catch(error => console.log(error) + setAlert(error.message + ". Please try again later!") + setTimeout(function() {
                    setAlert("")
                   }, 6000))
        } else {
            alert("Check the input fields!")
        }
        if (token.value.length !== 0) {
            navigate("/")
        }
    }
    async function recoveryfunc() {
        let success = false;
        console.log(stage);
        let recovery = password;
        if (stage === 1) {
            await axios.postForm('login/forgot', { username, recovery })
                .then(resp => success = resp.data.Success)
                .catch(error => setAlert(error.message + ". Please try again later!") + setTimeout(function() {
                    setAlert("")
                   }, 6000))
            console.log(success);
            if (success === true) {
                success = false;
                stage = 2;
                setPass(true);
                setPassword("");
                setPassword2("");
            }
        } else {
            if (password === password2) {
                console.log("passcheck")
                console.log("Username: " + username)
                console.log("Password: " + password)
                await axios.putForm('login/change', { username, password })
                    .then(resp => success = resp.data.Success)
                    .catch(error => setAlert(error.message + ". Please try again later!") +setTimeout(function() {
                        setAlert("")
                       }, 6000))
            } else {
                setAlert("Passwords are not the same!")
                setTimeout(function() {
                    setAlert("")
                   }, 6000)
            }
            if (success === true) {
                stage = 1;
                success = false;
                alert("Password has been reset! Please login!")
                setPass(false);
                setForgot(false);
                reset();
            } else {
                setAlert("New password cannot be same as old password! ")
                setTimeout(function() {
                    setAlert("")
                   }, 6000)
                stage = 1;
                success = false;
                setPass(false);
                setForgot(false);
                reset();
            }
        }
    }
    function reset(){
        setPassword("");
        setPassword2("");
        setUsername("");
    }
}
