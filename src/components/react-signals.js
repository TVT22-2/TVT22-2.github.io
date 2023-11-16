import { effect, signal } from "@preact/signals-react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001';

export const token = signal(getSessionToken());
function getSessionToken(){
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
}

//Every time the token changes, updating the session storage.
//Also getting the userInfo with the token.
effect(()=>{
    sessionStorage.setItem('token', token.value);
});