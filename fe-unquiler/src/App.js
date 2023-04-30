import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './views/login/Login';
import UserRegister from './views/register/UserRegister';
import PublicRoute from './components/PublicRoute';
import Home from './views/home/Home';
import ClubRegister from "./views/register/ClubRegister";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route
                    path="/user/register"
                    element={
                        <PublicRoute>
                            <UserRegister/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/club/register"
                    element={
                        <PublicRoute>
                            <ClubRegister/>
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login/>
                        </PublicRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
