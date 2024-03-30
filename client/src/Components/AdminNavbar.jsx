import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
    const navigate = useNavigate()

    const adminNavigate = (e) => {
        navigate(`/${e.target.id}`)
    }
    return (
        <div>

            <nav class="navbar fixed-bottom navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                <a class="navbar-brand text-primary"  id="" href="javascript:void(0)" >Admin</a>
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
            </nav>
        </div>
    )
}

export default AdminNavbar