import "./login.css"
import { useState } from 'react';
export default function Login(){    
    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");
    return <>
    <div className="inputcontainer"><input className="Username" type="text" placeholder="Username" onChange={e => setUser(e.target.value)}></input>
    <input className="Password" type="password" placeholder="Password" onChange={e => setPass(e.target.value)}></input></div>
    <div className="ButtonContainer"><div className="Align"><button className="LoginB" id="LoginButton" onClick={returnvalues} onKeyDown={returnvalues}>Login</button><button className="LoginB" id="LoginReset">Forgot Password?</button></div></div>
    </>
    function returnvalues(event){
     console.log("Password: " + pass + "\n" + "Username: " + user);
     if (event.key === 'Enter') {
        console.log('enter was pressed to submit!');
    }
    }
}
