import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

let renderCount = 0

const RegisterUser  = () => {

    renderCount++
    const [formInfo, setFormInfo] = useState({
        first_name:"",
        last_name: "",
        display_name: "",
    })

    const navigate = useNavigate()
    const [errors, setErrors] = useState({
    })

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =(e) => {
        e.preventDefault()
        console.log(formInfo)
        axios.post('http://localhost:8000/api/register/player', formInfo)
        .then(res => {
            console.log(res)
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                navigate('/')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <h2 >Register A New Player ({renderCount})</h2>
        <form onSubmit={onSubmit}>
            <div>
                <label >First Name</label>
                <input type='text' name='first_name' onChange={changeHandler} ></input>
                {errors.firstName? <p style={{color: "red"}}>{errors.first_name.message}</p>: ""}
            </div>
            <div>
                <label >Last Name</label>
                <input type='text' name='last_name' onChange={changeHandler} ></input>
                {errors.lastName? <p style={{color: "red"}}>{errors.last_name.message}</p>: ""}
            </div>
            <div>
                <label >Username</label>
                <input type='text' name='display_name' onChange={changeHandler} ></input>
                {errors.displayName? <p style={{color: "red"}}>{errors.display_nName.message}</p>: ""}
            </div>
            <button type='submit' class="btn btn-primary" >Create Player</button>
        </form>
    </div>
    )

}



export default RegisterUser