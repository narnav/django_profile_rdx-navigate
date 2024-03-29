import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {
  loginAsync,regAsync,selectuserRegisterd,logout,selectlogged
} from '../features/login/loginSlice';
import styles from '../features/login/Counter.module.css';

export function Login() {
    const logged = useAppSelector(selectlogged);
  const registerd = useAppSelector(selectuserRegisterd);
  const dispatch = useAppDispatch();
    const [password, setpassword] = useState("")
    const [username, setuserName] = useState("")
    const notify = () => toast("Wow so easy! " + username);
    const [email, setemail] = useState("")

    const setRemember=()=>{
        let reme=localStorage.getItem("remember")
        if(reme !== null)
            
            return JSON.parse(reme)

    }

    const [remember, setremember] = useState(setRemember())//JSON.parse( localStorage.getItem("remember")|| "false"))
    useEffect(() => {
        console.log( localStorage.getItem("remember"))
        if(registerd){
        console.log(registerd)
        notify()
        }
        else{
            console.log("not registerd")
        }
    }, [registerd])
    
    useEffect(() => {
     localStorage.setItem("remember",JSON.stringify( remember))
    }, [remember])
    
  return (
    <div>
      <div className={styles.row}>
      {logged?<button onClick={()=>dispatch(logout())}>logout</button>:""}
      <button onClick={notify}>Notify!</button>
        <ToastContainer theme="dark"/>
          User name<input onChange={(e)=>setuserName(e.target.value)}/>
          password<input onChange={(e)=>setpassword(e.target.value)}/>
          email<input onChange={(e)=>setemail(e.target.value)}/>
          <button onClick={()=>dispatch(loginAsync({password,username}))}>Login</button>
          <button onClick={()=>dispatch(regAsync({password,username,email:email || "e@a.com"}))}>Register</button>
         
      </div>
      Remember me<input onChange={(e)=>setremember(e.target.checked)}  type={'checkbox'}></input>
    </div>
  );
}
