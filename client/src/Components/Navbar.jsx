import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import SeasonCountdown from './SeasonCountdown'
import GetBounty from './Bounty'
import { auth } from '../firebase';

const NavBar = () => {
    const navigate = useNavigate()
    const [allUser, setAllUser] = useState()
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(response => setAllUser(response.data))
            .catch(err => console.log(err))
        // check if user is logged in
        auth.onAuthStateChanged(user => {
            // if user is null, they are not logged in, navigate to login
            if (user != null) {
                setLoggedIn(true)
            }
        })
    }, [])
    const handleRedirect = (e) => {
        navigate(`/view/player/${e.target.value}`)
    }

    const handleNavigate = (e) => {
        navigate(`/${e.target.id}`)
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (

        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            {/* if logged in load NavBar */}
            {loggedIn ?
                <div class="container-fluid">
                    <a class="navbar-brand text-primary" onClick={handleNavigate} id="" href="javascript:void(0)" >ARAM League</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item ">
                                <a class="nav-link active text-warning-emphasis" aria-current="page" onClick={handleNavigate} id="" href="javascript:void(0)">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning-emphasis" onClick={handleNavigate} id="view/match" href="javascript:void(0)">Match History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning-emphasis" href="javascript:void(0)" onClick={handleNavigate} id="rules">Rules</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-warning-emphasis" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    View Player
                                </a>
                                <ul class="dropdown-menu">
                                    {allUser ?
                                        <li>
                                            {allUser.map((eachUser, Idx) => {
                                                return (
                                                    <li value={eachUser._id} onClick={handleRedirect}>{eachUser.display_name}</li>
                                                )
                                            })}
                                        </li>
                                        : <li></li>}


                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link text-warning-emphasis" href="javascript:void(0)" onClick={handleLogout} id="logout">Log Out</a>
                            </li>


                        </ul>
                    </div>
                    <div class="d-flex">
                        <div class="mx-2">
                            <GetBounty />
                        </div>
                        <div>
                            <SeasonCountdown />
                        </div>
                    </div>
                </div>
                :
                // If not logged in, only Navbar Logo
                <div class="container-fluid">
                <a class="navbar-brand text-primary" onClick={handleNavigate} id="" href="javascript:void(0)" >ARAM League</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>}

        </nav>
    )
}
export default NavBar