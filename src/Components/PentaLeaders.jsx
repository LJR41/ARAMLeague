import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'

const PentaLeaders = () =>{
    const [pentaLeaders, setPentaLeaders] =useState()

    useEffect(()=>{

        axios.get('http://localhost:8000/api/view/penta')
        .then(res => console.log(res))

    },[])
    
    return(
        <div></div>
    )
}

export default PentaLeaders