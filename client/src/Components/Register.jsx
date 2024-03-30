import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const [formInfo, setFormInfo] = useState({
        firstName : "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(formInfo)
    }
    return (
        <div>
            <h2 >Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >First Name</label>
                    <input type='text' name='firstName' onChange={changeHandler} ></input>
                </div>
                <div class="mt-2 ...">
                    <label >Last Name</label>
                    <input type='text' name='lastName'onChange={changeHandler} ></input>

                </div>
                <div class="mt-2 ...">
                    <label >Email</label>
                    <input type='email' name='email' onChange={changeHandler}></input>

                </div>
                <div class="mt-2 ...">
                    <label >Password</label>
                    <input type='password' name='password' onChange={changeHandler}></input>


                </div>
                <div class="mt-2 ...">
                    <label >Confirm Password</label>
                    <input type='password' name='confirmPassword' onChange={changeHandler}></input>

                </div>
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default Register