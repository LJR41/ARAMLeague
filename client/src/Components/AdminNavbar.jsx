import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, app } from '../firebase'

const AdminNavbar = () => {
    const navigate = useNavigate()
    const [adminState, setAdminState] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            // if user is NOT null, they are logged in, navigate to dash
            if (user == null) {
                navigate('/')
            }
            // if user IS null, navigate to login
            else if (user != null && user.id === process.env.REACT_APP_ADMIN_ID){
                setAdminState(true)
            }

        })
    }, [])

    const adminNavigate = (e) => {
        navigate(`/${e.target.id}`)
    }
    return (
        <div>
            {adminState ? <nav class="navbar fixed-bottom navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand text-primary" id="" href="javascript:void(0)" >Admin</a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link text-warning-emphasis" onClick={adminNavigate} id="register" href="javascript:void(0)">Register Player</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning-emphasis " onClick={adminNavigate} id="new/match" href="javascript:void(0)">Register Match</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav> : <></>}

        </div>
    )
}

export default AdminNavbar