import { effect, signal } from "@preact/signals-react";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3001';
export const token = signal(getSessionToken());
export const userID = signal(getUserID());
export const BearerToken = "";
function getUserID(){
    const t = sessionStorage.getItem('UserID');
    return t===null || t==='null' ? '' : t;
}
function getSessionToken(){
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
}
effect(()=>{
    sessionStorage.setItem('token', token.value);
    sessionStorage.setItem('UserID', userID.value);
});