import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { auth } from '../firebase'

const RegisterMatch = (props) => {
    const navigate = useNavigate()
    const [teamResult, setTeamResult] = useState()
    const [errors, setErrors] = useState({
    })

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            // if user is NOT null, they are logged in, navigate to dash
            if (user == null) {
                navigate('/')
            }
            // if user IS null, navigate to login
            else if (user != null && user.id !== process.env.REACT_APP_ADMIN_ID){
                navigate('/dashboard')
            }
        })
    }, [])
    const handleResult = (e) => {
        setTeamResult(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/create/match', {teamResult})
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/match/players')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h2>Record a Match</h2>
            <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <h4>Team Result</h4>
                                <input type="checkbox" name="win" value="1" onClick={handleResult}/>
                                <label htmlFor="win" class="mx-2">Win</label>
                                <input type="checkbox" name="loss" value="0" onClick={handleResult} />
                                <label htmlFor="loss" class="mx-2">Loss</label>
                            </div>
                        </div>
                <button type='submit'class="btn btn-primary mt-4" >Submit</button>
            </form>
        </div>
    )
}

export default RegisterMatch