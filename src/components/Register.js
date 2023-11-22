import "./login.css"
import axios from "axios";
import { token } from "./react-signals"
import { useNavigate } from "react-router-dom";
export default function Login() {
    let username, password, recovery
    const navigate = useNavigate();
return(
<>
    <div className="inputcontainer">
    <input className="Username" type="text" placeholder="Username"  onChange={e => username = e.target.value}></input>
    <input className="Password" type="password" placeholder="Password" onChange={e => password = e.target.value}></input>
    <input className="Password" type="password" placeholder="RecoveryKey" onChange={e => recovery = e.target.value}></input>
</div>
        <button className="Register" id="LoginButton" onClick={register}>Register</button> 
</>
);
async function register(){
    if (password !== "" && username !== "" && recovery !== "") {
        await axios.postForm('login/register', { username, password, recovery })
             .then(resp => token.value = resp.data.jwtToken)
             .catch(error => alert(error.message + ". Please try again later!"))
     } else {
         alert("Check the input fields!")
     }
     if(token.value.length>5){
        console.log(token.value);
          alert("Thank you! You will be redirected to the mainpage!")
          navigate("/");
     }
}
}
