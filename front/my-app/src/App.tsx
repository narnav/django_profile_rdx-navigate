import React, { useEffect } from 'react';
import './App.css';
import { Login } from './components/Login';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { selectlogged, logout, selectuserName, refreshAsync } from './features/login/loginSlice';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
function App() {
    const uNameeee = useAppSelector(selectuserName);
    const dispatch = useAppDispatch();

    useEffect(() => {

        const token = localStorage.getItem("refresh")
        let reme=localStorage.getItem("remember")
        if(reme !== null)
            if(JSON.parse(reme)===true)
            {
            if (token)
                dispatch(refreshAsync(token))
        }
    }, [])


    return (
        <div className="App">
            <header className="App-header">
                <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
                    <Link to="/login">login</Link>|
                    <Link to="/profile">profile</Link>|{" "}
                    <Link to="/test">test</Link>|{" "}
                </nav>

                <h1>Welcome {uNameeee}</h1>
                <Outlet></Outlet>
            </header>
        </div>
    );
}

export default App;
