import ICred from "../../models/Cred";
import axios from "axios";
const SERVER ="http://127.0.0.1:8000/"
export function login(cred:ICred) {
  return new Promise<{ data: any }>((resolve) =>
  axios.post(SERVER +"login/",cred).then(res => resolve({ data: res.data }))
  );
}

export function refresh(token:string) {
    return new Promise<{ data: any }>((resolve) =>
    axios.post(SERVER +"token/refresh/",{"refresh":token}).then(res => resolve({ data: res.data }))
    );
  }

export function register(cred:ICred) {
    return new Promise<{ data: any }>((resolve) =>
    axios.post(SERVER +"reg/",cred).then(res => resolve({ data: res.data }))
    );
  }