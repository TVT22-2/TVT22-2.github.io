import { effect, signal } from "@preact/signals-react";
import axios from "axios";
axios.defaults.baseURL = '';
export const token = signal(getSessionToken());
export const userID = signal(getUserID());
export const BearerToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzgzMGVlZjk2NThlYWMyNmE5YmJiYTMyMDJiYzIyMSIsInN1YiI6IjY1NDM4YmZmOWNjNjdiMDBkZjkxY2FkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YfFUMP1RQ9zgAuGJuPPFUWhcmGV-IV2NeLpJeEu4AHk";
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