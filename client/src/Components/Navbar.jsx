import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import SeasonCountdown from './SeasonCountdown'
import GetBounty from './Bounty'

const NavBar = () => {
    const navigate = useNavigate()
    const [allUser, setAllUser] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/api/players')
            .then(response => setAllUser(response.data))
            .catch(err => console.log(err))

        
    }, [])
    const handleRedirect = (e) => {
        console.log(e.target.value)
        navigate(`/view/player/${e.target.value}`)
    }

    const handleNavigate = (e) => {
        navigate(`/${e.target.id}`)
    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
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

                    </ul>
                </div>
                <div class="d-flex">
                    <div class="mx-2"><GetBounty></GetBounty></div>
                    <div>
                    <SeasonCountdown></SeasonCountdown>
                </div></div>
            </div>
        </nav>
    )
}
export default NavBar